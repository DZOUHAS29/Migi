"use client"
import { Icon, IconButton } from "@chakra-ui/react";
import { HiMenu } from "@react-icons/all-files/hi/HiMenu"
import { BiUserCircle } from "@react-icons/all-files/bi/BiUserCircle"
import Logo from "./Logo";
import { SideMenu } from "./SideMenu";
import { useState } from "react";

export default function TopBar() {
    const [open, setOpen] = useState<boolean>(false);

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
                                <Icon as={BiUserCircle} className="text-3xl cursor-pointer" />
                            </div>
                            <div className="grid p-3 justify-end">
                                <IconButton aria-label="menu" variant={"outline"}
                                    className="border-2 bg-blue-300 hover:bg-emerald-600 bg-none border-slate-900 text-slate-900 w-4"
                                    icon={<HiMenu />}
                                    onClick={() => { setOpen(true) }}
                                />
                            </div>
                            <SideMenu open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}