"use server"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

interface Output {
    message: string,
    variant: string
}

const prisma = new PrismaClient();

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
                username: `${username}`,
                email: `${email}`,
                password: `${hash}`
            }
        });

        //vygenerovat a přiřadit JWT token
        const payload = {
            sub: user.id,
            username: user.username,
            role: "user"
        }
        const token = jwt.sign(payload, JSON.stringify(process.env.JWT_SIGN_SECRET), { expiresIn: "60s" });
        const refresh = jwt.sign(payload, JSON.stringify(process.env.JWT_SIGN_REFRESH_SECRET), { expiresIn: "5m" });

        //uloží do db refresh token
        await prisma.refresh_tokens.create({
            data: {
                token: refresh,
                user_id: user.id
            }
        });

        //nastavit secure cookie pro token
        cookies().set({
            name: "jwt",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 30,
            path: "/"
        });

        return { message: "User successfully added", variant: "success" };
    } catch (error) {
        return { message: `${error}`, variant: "error" };
    }
}