import Link from "next/link";

export default function Register() {
    return (
        <div className="w-full h-5/6 flex">
            <div className="grid w-1/3  text-lg p-3">
                <div className="flex flex-col">
                    <div className="grid pb-10">
                        <span className="text-2xl">Welcome to Migi,</span>
                        your personal companion in
                        understanding and managing migraines. Migi is more than just a
                        tracking tool; it's a supportive platform designed to empower you on
                        your migraine journey. By registering with Migi, you gain access to intuitive
                        features that help monitor, analyze, and learn about your migraine patterns.
                        Take charge of your well-being and discover insights to better navigate your migraine
                        experiences with Migi by your side.
                    </div>
                    <div className="grid">
                        <img src="/register.svg" alt="neco"/>
                    </div>
                </div>
            </div>
            <div className="grid w-1/3">
                <div className="flex flex-col justify-center justify-self-center w-1/2">
                    <div className="grid p-2">
                        <p className="">Username</p>
                        <input type="text" className="rounded bg-blue-300 p-1" />
                    </div>
                    <div className="grid p-2">
                        <p className="">Email</p>
                        <input type="text" className="rounded bg-blue-300 p-1" />
                    </div>
                    <div className="grid p-2">
                        <p className="">Password</p>
                        <input type="password" className="rounded bg-blue-300 p-1" />
                    </div>
                    <div className="grid p-2">
                        <p className="">Enter password again</p>
                        <input type="password" className="rounded bg-blue-300 p-1" />
                    </div>
                    <div className="grid justify-center  p-2">
                        <button className="bg-blue-300 hover:bg-blue-400 p-2 rounded ">Register</button>
                    </div>
                    <div className="grid justify-center" p-2>
                        <Link href={"/"} className="text-sm underline ">Log in</Link>
                    </div>
                </div>
            </div>
            <div className="grid w-1/3">
                <div className="flex flex-col">
                    <div className="grid">
                        <span>
                            Check out our socials!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}