"use client"
import React from 'react';
import { Input } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/app/actions"
import { redirect } from "next/navigation";

interface Warning {
    message: string,
    variant: string
}

export default function LoginPaper() {
    const [warning, setWarning] = useState<Warning>({ message: "", variant: "" });

    const submit = async (formData: globalThis.FormData) => {
        const data = await login(formData);

        setWarning(data);

        if (data.variant === "success")
            return redirect("/home");
    }

    return (
        <form>
            <div className="flex flex-col p-5 bg-air-blue rounded shadow-md">
                <div className="grid p-2 text-center text-xl">
                    <span>Welcome Back!</span>
                </div>
                <div className="grid p-2">
                    <p className="">Username or Email</p>
                    <Input
                        type="text"
                        name="name"
                        className="bg-white"
                    />
                </div>
                <div className="grid p-2">
                    <p className="">Password</p>
                    <Input
                        type="password"
                        name="password"
                        className="bg-white"
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
                <div className="grid justify-center p-2">
                    <button className="bg-light-blue shadow-sm text-white hover:bg-light-dark-blue p-2 rounded" formAction={submit}>Log in</button>
                </div>
                <div className="grid justify-center p-2">
                    <Link href={"/register"} className="text-sm underline ">Register</Link>
                </div>
            </div>
        </form>
    )
}
