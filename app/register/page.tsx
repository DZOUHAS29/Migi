"use client"
import Link from "next/link";
import { useState } from "react";
import { register } from "@/app/actions"
import { redirect } from "next/navigation";

interface Warning {
    message: string,
    variant: string
}

export default function Register() {
    const [warning, setWarning] = useState<Warning>({ message: "", variant: "" });

    const submit = async (formData: globalThis.FormData) => {
        const data = await register(formData);

        setWarning(data);

        if (data.variant === "success")
            return redirect("/home");
    }

    return (
        <div className="w-full h-5/6 p-10 grid grid-cols-3">
            <div className="xs-column col-span-1">
                <div className="flex flex-col p-5">
                    <div className="grid pb-10 center-text">
                        <span className="text-3xl">Welcome to Migi,</span>
                        <span className="text-lg">
                            your personal companion in
                            understanding and managing migraines. Migi is more than just a
                            tracking tool; it's a supportive platform designed to empower you on
                            your migraine journey. By registering with Migi, you gain access to intuitive
                            features that help monitor, analyze, and learn about your migraine patterns.
                            Take charge of your well-being and discover insights to better navigate your migraine
                            experiences with Migi by your side.
                        </span>
                    </div>
                    <div className="grid">
                        <img src="/register.svg" alt="neco" />
                    </div>
                </div>
            </div>
            <div className="xs-column col-span-1 xl:p-10">
                <form>
                    <div className="flex flex-col p-5">
                        <div className="grid p-2 text-center text-xl">
                            <span>Register now to gain access!</span>
                        </div>
                        <div className="grid p-2">
                            <p className="">Username</p>
                            <input type="text" name="username" className="rounded bg-blue-300 p-1" />
                        </div>
                        <div className="grid p-2">
                            <p className="">Email</p>
                            <input type="text" name="email" className="rounded bg-blue-300 p-1" />
                        </div>
                        <div className="grid p-2">
                            <p className="">Password</p>
                            <input type="password" name="password" className="rounded bg-blue-300 p-1" />
                        </div>
                        <div className="grid p-2">
                            <p className="">Enter password again</p>
                            <input type="password" name="repassword" className="rounded bg-blue-300 p-1" />
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
                            <button className="bg-blue-400 hover:bg-blue-500 p-2 rounded" formAction={submit}>Register</button>
                        </div>
                        <div className="grid justify-center p-2">
                            <Link href={"/"} className="text-sm underline ">Log in</Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="xs-column col-span-1">
                <div className="flex flex-col text-center p-2">
                    <div className="grid">
                        <span>
                            Check out our socials!
                        </span>
                    </div>
                    <div className="grid">
                        <div className="flex justify-center">
                            <div className="grid p-2">
                                <img src="/instagram.svg" alt="instagram" />
                            </div>
                            <div className="grid p-2">
                                <img src="/facebook.svg" alt="facebook" />
                            </div>
                            <div className="grid p-2">
                                <img src="/x.svg" alt="x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}