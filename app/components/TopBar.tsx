"use client"
import { Avatar, Badge, Icon, IconButton, Menu, MenuButton, MenuItem, Stack } from "@chakra-ui/react";
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu";
import { IoMdNotificationsOutline } from "@react-icons/all-files/io/IoMdNotificationsOutline";
import { BiUserCircle } from "@react-icons/all-files/bi/BiUserCircle"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import Logo from "./Logo";
import { SideMenu } from "./SideMenu";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { useRouter } from "next/navigation";
import { NotificationsMenu } from "./NotificationsMenu";
import { useSocket } from "../contexts/socket";

export default function TopBar() {
    const [open, setOpen] = useState<boolean>(false);
    const [notifi, setNotifi] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const { auth } = useAuth();
    const { socket } = useSocket();
    const router = useRouter();

    useEffect(() => {
        socket?.on("new-notification", notification => {
            if (typeof notification === "number")
                return;

            setCount(count => count + 1);
        });

        return () => {
            socket?.off("new-notification");
        }
    }, [socket])

    useEffect(() => {
        if (notifi && count > 0)
            setCount(0);
    }, [notifi])

    return (
        <div className="flex pr-3">
            <div className="grid p-3">
                <Logo />
            </div>
            <div className="grid flex-1 justify-end">
                <div className="flex space-x-2">
                    <div className="grid content-center">
                        <IconButton
                            icon={auth.id !== -1 ? <BiUser /> : <BiUserCircle />}
                            aria-label="open notifications"
                            className="text-2xl text-white hover:bg-black hover:bg-opacity-5"
                            variant={"ghost"}
                            onClick={() => { router.push("/profile") }}
                        />
                    </div>
                    <div className="grid content-center">
                        <div className="flex">
                            <div>
                                <IconButton
                                    icon={<IoMdNotificationsOutline />}
                                    aria-label="open notifications"
                                    className="text-2xl text-white hover:bg-black hover:bg-opacity-5"
                                    variant={"ghost"}
                                    onClick={() => { setNotifi(!notifi) }}
                                />
                            </div>
                            <div>
                                {
                                    count === 0 ?
                                        null
                                        :
                                        <Badge rounded={"full"} colorScheme="red" className="h-5">
                                            {count}
                                        </Badge>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid content-center">
                        <IconButton
                            icon={<HiOutlineMenu />}
                            aria-label="open notifications"
                            className="text-2xl text-white hover:bg-black hover:bg-opacity-5"
                            variant={"ghost"}
                            onClick={() => { setOpen(true) }}
                        />
                    </div>
                    <SideMenu open={open} setOpen={setOpen} />
                    <NotificationsMenu open={notifi} setOpen={setNotifi} />
                </div>
            </div>
        </div>
    )
}