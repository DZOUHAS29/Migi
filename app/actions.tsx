"use server"
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { InfoProps, Output, User } from './interfaces';
import { redis } from "../lib/redis";
import { getCollection } from '@/lib/mongo';

const assignSession = (user: User) => {
    const sessionId = (typeof crypto !== "undefined" && (crypto as any).randomUUID)
        ? (crypto as any).randomUUID()
        : Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

    cookies().set({
        name: "session",
        value: sessionId,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    cookies().set({
        name: "user",
        value: JSON.stringify(user),
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    redis?.set(`session:${sessionId}`, JSON.stringify(user), "EX", 60 * 60 * 24 * 7);
}

export const register = async (formData: FormData): Promise<Output> => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    try {
        if (username === "" || email === "" || password === "" || repassword === "" || !password)
            throw new Error("Some inputs are empty");

        const passwordLength: string[] = password.toString().split("");

        if (passwordLength.length < 8)
            throw new Error("Password must have at least 8 characters");

        if (password !== repassword)
            throw new Error("Passwords don't match");

        const hash = await bcrypt.hash(`${password}`, 10);

        const users = await getCollection("users");

        if (!users)
            return { message: "collection not found", variant: "error" }

        const data = await users.insertOne({
            username: username as string,
            email: email as string,
            password: hash as string,
        });

        const created = await users.findOne({ _id: data.insertedId });

        const user = {
            id: data.insertedId.toString(),
            username: created?.username as string,
            email: created?.email as string
        }

        assignSession(user);

        return { message: "user successfully added", variant: "success", user };
    } catch (error) {
        return { message: `${error}`, variant: "error" };
    }
}

export const login = async (formData: FormData): Promise<Output> => {
    const name = formData.get("name");
    const password = formData.get("password");

    try {
        if (name === "" || password === "")
            throw new Error("Some inputs are empty");

        const users = await getCollection("users");

        if (!users)
            throw new Error("Users collection not found");

        const found = await users.findOne({
            $or: [{ username: name as string }, { email: name as string }]
        });

        if (!found)
            throw new Error("User doesn't exist");

        if (!await bcrypt.compare(password as string, found.password as string))
            throw new Error("Password is incorrect");

        const user = {
            id: found._id.toString(),
            username: found.username as string,
            email: found.email as string
        };

        assignSession(user);

        return { message: "successfully logged in", variant: "success", user };
    } catch (error) {
        return { message: `${error}`, variant: "error" };
    }
}

export const getUser = async (): Promise<Output> => {
    const sessionCookie = cookies().get("session");

    if (!sessionCookie || !sessionCookie.value)
        return { variant: "error", message: "session not found", code: 403 };

    const sessionId = sessionCookie.value;

    const user = await redis?.get(`session:${sessionId}`);

    if (!user)
        return { variant: "error", message: "session not found", code: 403 };

    return { variant: "success", message: "user found", user: JSON.parse(user) }
}

export const logOut = async (): Promise<Output> => {
    const sessionCookie = cookies().get("session");

    try {
        const sessionId = sessionCookie?.value;

        if (sessionId)
            await redis?.del(`session:${sessionId}`);

        cookies().delete("session");
        cookies().delete("user");

        return { variant: "success", message: "user log out" };
    } catch (error) {
        return { variant: "error", message: "user log out error", code: 500 };
    }

}

export const changeInfo = async ({ username, email, old, password, check }: InfoProps): Promise<number | string> => {
    const userCookie = cookies().get("user");

    if (!userCookie || !userCookie.value)
        return "user not found";

    const { id } = JSON.parse(userCookie.value);

    try {
        const users = await getCollection("users");

        if (!users) return "server error";

        if (old === "") {
            const result = await users.findOneAndUpdate({ id }, { $set: { username, email } }, { returnDocument: "after" });

            if (result) {
                cookies().set({ name: "user", value: JSON.stringify(result), httpOnly: false, secure: true, sameSite: "strict", path: "/" });
            }

            return 200;
        }

        const dbUser = await users.findOne({ id }, { projection: { password: 1 } });

        if (!dbUser || !await bcrypt.compare(old, dbUser.password as string))
            return "Password is wrong";

        if (password !== check)
            return "Passwords don't match";

        const hash = await bcrypt.hash(`${password}`, 10);

        const result = await users.findOneAndUpdate({ id }, { $set: { username, email, password: hash } }, { returnDocument: "after" });

        if (result) {
            cookies().set({ name: "user", value: JSON.stringify(result), httpOnly: false, secure: true, sameSite: "strict", path: "/" });
        }

        return 200;
    } catch (error) {
        return "server error";
    }
}