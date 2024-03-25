"use client"
import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { register } from "@/app/actions"
import { redirect } from "next/navigation";
import { Input } from "@chakra-ui/react";

interface Warning {
    message: string,
    variant: string
}

export default function RegisterPaper() {
    const [warning, setWarning] = useState<Warning>({ message: "", variant: "" });

    const submit = async (formData: globalThis.FormData) => {
        const data = await register(formData);

        setWarning(data);

        if (data.variant !== "success")
            return;

        const { user } = data;

        if (!user)
            return redirect("/home");

        sessionStorage.setItem("user", JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email
        }));

        return redirect("/");
    }

    return (
        <form>
            <div className="flex flex-col p-5 bg-air-blue rounded shadow-md">
                <div className="grid p-2 text-center text-xl">
                    <span>Register now to gain access!</span>
                </div>
                <div className="grid p-2">
                    <p className="">Username</p>
                    <Input
                        type="text"
                        name="username"
                        className="bg-white text-black"
                    />
                </div>
                <div className="grid p-2">
                    <p className="">Email</p>
                    <Input
                        type="text"
                        name="email"
                        className="bg-white text-black"
                    />
                </div>
                <div className="grid p-2">
                    <p className="">Password</p>
                    <Input
                        type="password"
                        name="password"
                        className="bg-white text-black"
                    />
                </div>
                <div className="grid p-2">
                    <p className="">Enter password again</p>
                    <Input
                        type="password"
                        name="repassword"
                        className="bg-white text-black"
                    />
                </div>
                <div className="grid">
                    {
                        warning.variant === "" ?
                            <></>
                            :
                            <span className={`${warning.variant === "error" ? "text-red-700" : "text-green-600"} p-2 text-center`}>{warning.message}</span>
                    }
                </div>
                <div className="grid justify-center  p-2">
                    <button className="bg-light-blue shadow-sm text-white hover:bg-light-dark-blue p-2 rounded" formAction={submit}>Register</button>
                </div>
                <div className="grid justify-center p-2">
                    <Link href={"/"} className="text-sm underline ">Log in</Link>
                </div>
            </div>
        </form>
    )
}
