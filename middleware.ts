import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { jwtVerify, errors, SignJWT } from "jose";

export async function middleware(request: NextRequest) {
    //zjistí jestli se v cookies nachází jwt
    let exists = request.cookies.has("jwt");

    if (!exists)
        return NextResponse.redirect(new URL("/login", request.url));


    //parsne jwt a zkontroluje
    const cookie = request.cookies.get("jwt")?.value;
    const secret = process.env.JWT_SIGN_SECRET;
    const key = new TextEncoder().encode(secret);

    if (!cookie || !secret)
        return NextResponse.redirect(new URL("/login", request.url));

    try {
        const { payload } = await jwtVerify(cookie, key);

        const response = NextResponse.next();

        response.cookies.set({
            name: "permission",
            value: payload.role as string,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
        });

        return response;
    } catch (error) {
        if (error instanceof errors.JWSInvalid) {
            const refresh = localStorage.getItem("refresh");

            if (!refresh)
                return NextResponse.redirect(new URL("/login", request.url));

            const secret = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);
            const refreshSecret = new TextEncoder().encode(process.env.JWT_SIGN_REFRESH_SECRET);

            try {
                const { payload } = await jwtVerify(refresh, refreshSecret);

                const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(secret);

                const response = NextResponse.next();

                response.cookies.set({
                    name: "jwt",
                    value: token,
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    maxAge: 60 * 60,
                    path: "/"
                });

                response.cookies.set({
                    name: "permission",
                    value: payload.role as string,
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 60 * 60,
                    path: "/"
                });

                return response;
            } catch (error) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        } else
            return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|register|login|.*\\..*|refresh).*)',
    ],
}