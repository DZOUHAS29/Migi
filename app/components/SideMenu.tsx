import { BiHomeSmile } from "@react-icons/all-files/bi/BiHomeSmile";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { IoStatsChart } from "@react-icons/all-files/io5/IoStatsChart";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type props = {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const SideMenu: React.FC<props> = ({ open, setOpen }) => {
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    }
    const handleRedirect = (path: string) => {
        router.push(`/${path}`);
        setOpen(false);
    };

    return (
        <Drawer
            isOpen={open}
            onClose={handleClose}
            placement="right"
            size={"sm"}
        >
            <DrawerOverlay />
            <DrawerContent className="bg-air-blue rounded">
                <DrawerCloseButton />
                <DrawerHeader >
                    Menu
                </DrawerHeader>
                <DrawerBody >
                    <div className="flex flex-col gap-y-7">
                        <div>
                            <Divider />
                        </div>
                        <div>
                            <Button
                                leftIcon={<BiHomeSmile />}
                                className="w-full h-16 text-white text-2xl  hover:bg-light-dark-blue"
                                onClick={() => { handleRedirect("home") }}
                            >
                                Home
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<BiUser />}
                                className="w-full h-16 text-white text-2xl  hover:bg-light-dark-blue"
                                onClick={() => { handleRedirect("home") }}
                            >
                                Profile
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<IoStatsChart />}
                                className="w-full h-16 text-white text-2xl  hover:bg-light-dark-blue"
                                onClick={() => { handleRedirect("stats") }}
                            >
                                Statistics
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<IoIosSettings />}
                                className="w-full h-16 text-white text-2xl  hover:bg-light-dark-blue"
                                onClick={() => { handleRedirect("home") }}
                            >
                                Settings
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<BiLogOut />}
                                className="w-full h-16 text-white bg-red-500 text-2xl  hover:bg-red-600"
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}