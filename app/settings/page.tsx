"use client"
import { Alert, AlertIcon, Button, Input, ToastId, useToast } from "@chakra-ui/react";
import Auth from "../auth";
import { useAuth } from "../contexts/auth";
import { useEffect, useState } from "react";
import { changeInfo, getUser } from "../actions";

export default function Settings() {
    const [name, setName] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [old, setOld] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [check, setCheck] = useState<string>("");
    const toast = useToast();
    const { auth: { email, username }, setAuth } = useAuth();

    useEffect(() => {
        if (!email || !username)
            return;

        setName(username);
        setMail(email);
    }, [])


    const handleChange = async (): Promise<ToastId | void> => {
        if (name === "" || mail === "")
            return toast({
                title: "Error",
                description: "Username or Email must not be empty!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left"
            });


        const status = await changeInfo({ username: name, email: mail, old, password, check });

        if (typeof status === "string")
            return toast({
                title: status,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });

        toast({
            title: "Succesfully changed",
            description: "You're information has been succesfully changed!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-left"
        });

        const { user } = await getUser();

        if (!user)
            return;

        setAuth(user);
        setOld("");
        setPassword("");
        setCheck("");
    }

    return (
        <div className="flex justify-center">
            <Auth />
            <div className="flexflex-col bg-air-blue w-1/2 p-9 rounded">
                <div className="text-2xl font-medium pb-2">
                    Profile info
                </div>
                <div className='flex flex-col pt-2'>
                    <div>
                        Username
                    </div>
                    <div>
                        <Input
                            type="text"
                            value={name}
                            className="bg-white text-black"
                            size={'lg'}
                            onChange={event => { setName(event.target.value) }}
                        />
                    </div>
                </div>
                <div className='flex flex-col pt-2'>
                    <div>
                        Email
                    </div>
                    <div>
                        <Input
                            type="text"
                            value={mail}
                            className="bg-white text-black"
                            size={'lg'}
                            onChange={event => { setMail(event.target.value) }}
                        />
                    </div>
                </div>
                <div className='flex flex-col pt-2 gap-y-2'>
                    <div>
                        Old password
                    </div>
                    <div>
                        <Input
                            type="password"
                            value={old}
                            className="bg-white text-black"
                            size={'lg'}
                            onChange={event => { setOld(event.target.value) }}
                        />
                    </div>
                    <div>
                        New password
                    </div>
                    <div>
                        <Input
                            type="password"
                            size={'lg'}
                            value={password}
                            className="bg-white text-black"
                            onChange={event => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div>
                        Check new password
                    </div>
                    <div>
                        <Input
                            type="password"
                            className="bg-white text-black"
                            size={'lg'}
                            value={check}
                            onChange={event => { setCheck(event.target.value) }}
                        />
                    </div>
                </div>
                <div className="text-right pt-9">
                    <Button
                        size={"lg"}
                        variant={"solid"}
                        className="bg-light-blue text-white hover:bg-light-dark-blue"
                        onClick={handleChange}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}