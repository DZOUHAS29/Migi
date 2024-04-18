"use client"
import React from 'react';
import { Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/app/actions"
import { redirect } from "next/navigation";

export default function LoginPaper() {
    const toast = useToast();

    const submit = async (formData: globalThis.FormData) => {
        const data = await login(formData);

        toast({
            title: data.message,
            status: data.variant === "success" ? "success" : "error",
            duration: data.variant === "success" ? 3000 : 5000,
            isClosable: true,
            position: "bottom-left"
        })

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

        redirect("/");
    }

    return (
        <form>
            <div className="flex flex-col p-5 bg-air-blue rounded">
                <div className="grid p-2 text-center text-xl">
                    <span>Welcome Back!</span>
                </div>
                <div className="grid p-2">
                    <p className="">Username or Email</p>
                    <Input
                        type="text"
                        name="name"
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
