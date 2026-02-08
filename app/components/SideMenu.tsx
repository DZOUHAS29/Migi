import { BiHomeSmile } from "@react-icons/all-files/bi/BiHomeSmile";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { IoStatsChart } from "@react-icons/all-files/io5/IoStatsChart";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { logOut } from "../actions";
import { useAuth } from "../contexts/auth";
import { useRecords } from "../contexts/records";

type props = {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const SideMenu: React.FC<props> = ({ open, setOpen }) => {
    const router = useRouter();
    const { setAuth } = useAuth();
    const { setRecords } = useRecords();

    const handleClose = () => {
        setOpen(false);
    }
    const handleRedirect = (path: string) => {
        router.push(`/${path}`);
        setOpen(false);
    };

    const handleLogout = () => {
        logOut();
        setAuth({ id: -1, email: "", username: "" });
        setRecords([]);
        router.push("/login");
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
            <DrawerContent className="bg-ucla-blue rounded">
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
                                className="w-full h-16 text-white text-2xl  hover:bg-ucla-dark-blue"
                                onClick={() => { handleRedirect("home") }}
                            >
                                Home
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<BiUser />}
                                className="w-full h-16 text-white text-2xl  hover:bg-ucla-dark-blue"
                                onClick={() => { handleRedirect("profile") }}
                            >
                                Profile
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<IoStatsChart />}
                                className="w-full h-16 text-white text-2xl  hover:bg-ucla-dark-blue"
                                onClick={() => { handleRedirect("stats") }}
                            >
                                Statistics
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<IoIosSettings />}
                                className="w-full h-16 text-white text-2xl  hover:bg-ucla-dark-blue"
                                onClick={() => { handleRedirect("settings") }}
                            >
                                Settings
                            </Button>
                        </div>
                        <div>
                            <Button
                                leftIcon={<BiLogOut />}
                                className="w-full h-16 text-white bg-red-500 text-2xl  hover:bg-red-600"
                                onClick={handleLogout}
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