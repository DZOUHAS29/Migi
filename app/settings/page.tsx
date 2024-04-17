"use client"
import { Button } from "@chakra-ui/react";
import Auth from "../auth";
import { useAuth } from "../contexts/auth";
import { PasswordComp } from "./components/PasswordComp";
import { SettingComp } from "./components/SettingComp";

export default function Settings() {
    const { auth } = useAuth();

    const handleChange = (formData: FormData) => {
        const ahoj = formData.get("username");
    }

    return (
        <div className="flex justify-center">
            <Auth />
            <div className="flex flex-col gap-y-2 bg-ucla-dark-blue w-1/4 p-9 rounded">
                <form>
                    <SettingComp name="Username" value={auth.username} type="text" />
                    <SettingComp name="Email" value={auth.email} type="text" />
                    <PasswordComp value={auth.password as string} />
                    <div className="text-right pt-9">
                        <Button
                            size={"lg"}
                            variant={"solid"}
                            className="bg-gray-300 text-ucla-blue"
                            formAction={handleChange}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}