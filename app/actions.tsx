"use server"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from "next/headers";

interface Output {
    message: string;
    variant: string;
}

interface User {
    id: number | string;
    username: string;
    email: string;
    password: string;
}

const prisma = new PrismaClient();

const signTokens = async (user: User): Promise<void> => {
    const payload = {
        sub: user.id as string,
        username: user.username,
        role: "user"
    }

    const secret = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);
    const refreshSecret = new TextEncoder().encode(process.env.JWT_SIGN_REFRESH_SECRET);

    const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(secret);
    const refresh = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(refreshSecret);

    //uloží do local storage refresh token
    localStorage.setItem("refresh", refresh);

    //nastavit secure cookie pro token
    cookies().set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60,
        path: "/"
    });

    //nastavit usera
    cookies().set({
        name: "user",
        value: JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email
        }),
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60,
        path: "/"
    });
}

export const register = async (formData: FormData): Promise<Output> => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    try {
        //kontrola inputů
        if (username === "" || email === "" || password === "" || repassword === "")
            throw new Error("Some inputs are empty");

        if (password !== repassword)
            throw new Error("Passwords don't match");

        //hash hesla
        const hash = await bcrypt.hash(`${password}`, 10);

        //přidání usera do db
        const user = await prisma.users.create({
            data: {
                username: username as string,
                email: email as string,
                password: hash as string
            }
        });

        //vygenerovat a přiřadit JWT token
        await signTokens(user);

        return { message: "User successfully added", variant: "success" };
    } catch (error) {
        return { message: `${error}`, variant: "error" };
    }
}

export const login = async (formData: FormData): Promise<Output> => {
    const name = formData.get("name");
    const password = formData.get("password");

    try {
        //kontrola inputů
        if (name === "" || password === "")
            throw new Error("Some inputs are empty");

        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    {
                        username: name as string
                    },
                    {
                        email: name as string
                    }
                ]
            }
        });

        if (!user)
            throw new Error("User doesn't exist");

        if (!await bcrypt.compare(password as string, user.password))
            throw new Error("Password is incorrect");

        //vygenerovat a přiřadit JWT token
        await signTokens(user)

        return { message: "Successfully logged in", variant: "success" };
    } catch (error) {
        return { message: `${error}`, variant: "error" };
    }
}

/* export const refresh = async (userId: number): Promise<Output> => {
    try {
        const token = await prisma.refresh_tokens.findFirst({
            where: {
                user_id: userId
            },
            orderBy: {
                id: "desc"
            }
        });

        if (!token)
            return { message: "Refresh token doesn't exist", variant: "error" };

        const secret = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);

        const { payload } = await jwtVerify(token.token, secret);

        const access = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(key);




        return { message: "", variant: "success" };
    } catch (error) {
        return { message: "Refresh token failed", variant: "error" };
    }
} */