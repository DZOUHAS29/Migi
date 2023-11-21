"use client"
import { Icon, IconButton } from "@chakra-ui/react";
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu";
import { BiUserCircle } from "@react-icons/all-files/bi/BiUserCircle"
import Logo from "./Logo";
import { SideMenu } from "./SideMenu";
import { useState } from "react";

export default function TopBar() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex">
            <div className="grid p-3">
                <Logo />
            </div>
            <div className="grid flex-1 justify-end">
                <div className="flex">
                    <div className="grid p-3 content-center">
                        <Icon as={BiUserCircle} className="text-3xl cursor-pointer" />
                    </div>
                    <div className="grid p-3">
                        <button className="text-3xl" onClick={() => { setOpen(true) }}>
                            <HiOutlineMenu />
                        </button>
                    </div>
                    <SideMenu open={open} setOpen={setOpen} />
                </div>
            </div>
        </div>
    )
}