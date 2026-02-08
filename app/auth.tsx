"use client"
import { useAuth } from "./contexts/auth";
import { useEffect } from "react";
import { getUser } from "./actions";
import { useRouter } from "next/navigation";

export default function Auth() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const configUser = async () => {
        const { user } = await getUser();

        if (!user)
            return router.push("/login");

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