"use client"
import { Icon, IconButton } from "@chakra-ui/react";
import { HiMenu } from "@react-icons/all-files/hi/HiMenu"
import { BiUserCircle } from "@react-icons/all-files/bi/BiUserCircle"
import Logo from "./Logo";

export default function TopBar() {
    return (
        <div className="flex-col">
            <div className="grid">
                <div className="flex">
                    <div className="grid p-3">
                        <Logo />
                    </div>
                    <div className="grid flex-1 justify-end">
                        <div className="flex">
                            <div className="grid p-3 py-4">
                                <Icon as={BiUserCircle} className="text-3xl cursor-pointer hover:text-blue-500" />
                            </div>
                            <div className="grid p-3 justify-end">
                                <IconButton aria-label="menu" className="bg-blue-400 hover:bg-blue-500 w-4" icon={<HiMenu />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}