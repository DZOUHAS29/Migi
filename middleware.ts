import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { jwtVerify, errors } from "jose";

export async function middleware(request: NextRequest) {
    //zjistí jestli se v cookies nachází jwt
    let exists = request.cookies.has("jwt");

    //inicializuje odpověď
    const response = NextResponse.next();

    if (!exists)
        return NextResponse.redirect(new URL("/login", request.url));

    //parsne jwt
    const cookie = request.cookies.get("jwt")?.value;

    //má jwt cookie hodnotu?
    if (!cookie)
        return NextResponse.redirect(new URL("/login", request.url));

    //kontrola jwt tokenu
    const key = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);

    if (!key)
        return NextResponse.redirect(new URL("/login"));

    try {
        await jwtVerify(cookie, key);

        return response;
    } catch (error) {
        /* if (error instanceof errors.JWTExpired) {

            if (tryRefresh.variant === "error")
                return NextResponse.redirect(new URL("/login", request.url));

            return NextResponse.redirect(new URL("/home", request.url));

        } */

        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|register|login|.*\\..*).*)',
    ],
}