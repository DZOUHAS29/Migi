"use client"
import { redirect } from "next/navigation";
import { useAuth } from "./contexts/auth";
import { useEffect } from "react";
import { cookies } from "next/headers";
import { getUser } from "./actions";

export default function Auth() {
    const { auth, setAuth } = useAuth();

    const configUser = async () => {
        const { user } = await getUser();

        if (!user)
            return console.log("undefined");

        if (auth.id === user.id)
            return;

        setAuth(user);
    }

    useEffect(() => {
        configUser();
    }, [])

    return (
        <>
        </>
    )
}