import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    //zjistí jestli se v cookies nachází jwt
    let exists = request.cookies.has("jwt");

    if (!exists)
        return NextResponse.redirect(new URL("/register", request.url));


    //parsne jwt a zkontroluje
    const cookie = request.cookies.get("jwt")?.value;
    const secret = process.env.JWT_SIGN_SECRET;

    if (!cookie || !secret)
        return NextResponse.redirect(new URL("/register", request.url));

    try {
        const decoded = jwt.verify(cookie, secret);

        return NextResponse.json({ token: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 403 });
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|register|login|.*\\..*).*)',
    ],
}