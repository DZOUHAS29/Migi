"use server"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from "next/headers";
import { RecordsProps } from './interfaces';
import { Server } from 'socket.io';

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
    //const refreshSecret = new TextEncoder().encode(process.env.JWT_SIGN_REFRESH_SECRET);

    const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("2h").setIssuedAt().sign(secret);
    //const refresh = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(refreshSecret);

    //uloží do local storage refresh token

    //nastavit secure cookie pro token
    cookies().set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 2,
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
        maxAge: 60 * 60 * 2,
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

export const refresh = async (): Promise<Output> => {
    const user = cookies().get("user")?.value;

    if (!user)
        return { message: "User doesn't exist", variant: "error" };

    const { id } = JSON.parse(user);

    try {
        const token = await prisma.refresh_tokens.findFirst({
            where: {
                user_id: id
            },
            orderBy: {
                id: "desc"
            }
        });

        if (!token)
            return { message: "Refresh token doesn't exist", variant: "error" };

        const key = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);

        //zkontroluje refresh token
        const { payload } = await jwtVerify(token.token, key);

        //pokud je refresh token v pohodě přiřadí novej token
        const access = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").setIssuedAt().sign(key);

        //nastavit secure cookie pro token
        cookies().set({
            name: "jwt",
            value: access,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60,
            path: "/"
        });

        return { message: "New Access token signed", variant: "success" };
    } catch (error) {
        return { message: "Refresh token failed", variant: "error" };
    }
}

export const addRecord = async (formData: FormData): Promise<Output> => {
    const date = formData.get("date")?.toString();
    const type = formData.get("type")?.toString();
    const daytime = formData.get("daytime")?.toString();
    const cause = formData.get("cause")?.toString();
    const meds: boolean = formData.get("meds") === "true" ? true : false;
    const user = cookies().get("user")?.value;

    if (date === "" || type === "" || daytime === "" || cause === "" || meds === undefined)
        return { message: "Some inputs are empty", variant: "error" }

    if (!user || user === "")
        return { message: "User is missing. Try refreshing page", variant: "error" }

    const { id } = JSON.parse(user);

    try {
        const found = await prisma.records.findFirst({
            where: {
                user_id: id,
                date: new Date(date as string),
                day_part: daytime
            }
        });

        if (found)
            return { message: "Record already exists", variant: "error" };

        const data = await prisma.records.create({
            data: {
                user_id: id,
                date: new Date(date as string),
                type: type as string,
                cause: cause as string,
                day_part: daytime as string,
                meds: meds
            }
        });

        /* socket */

        return { message: "Records added", variant: "success" }
    } catch (error) {
        return { message: "Something went wrong", variant: "error" }
    }
}

export const getRecords = async (week: string[]): Promise<number | RecordsProps[]> => {
    if (week.length <= 0)
        return 500;

    const user = cookies().get("user")?.value;

    if (!user)
        return 500;

    const { id } = JSON.parse(user);

    try {
        const data = await prisma.records.findMany({
            where: {
                user_id: id,
                date: {
                    in: week.map(day => new Date(day))
                }
            },
        });

        return data;
    } catch (error) {
        return 500;
    }
}