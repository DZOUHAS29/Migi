import { CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Notification } from '../interfaces';
import { getNotifications } from "../status-actions";
import { GrStatusWarningSmall } from "@react-icons/all-files/gr/GrStatusWarningSmall";
import { useSocket } from "../contexts/socket";

type props = {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const NotificationsMenu: React.FC<props> = ({ open, setOpen }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { socket } = useSocket();

    const handleClose = () => {
        setOpen(false);
    }

    const getData = async (): Promise<void> => {
        const data = await getNotifications();

        if (typeof data === "number")
            return;

        setNotifications(data);
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        socket?.on("new-notification", notification => {
            if (typeof notification === "number")
                return;

            setNotifications(notifications => [...notifications, notification]);
        });

        return () => {
            socket?.off("new-notification");
        }
    }, [socket])

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
                <DrawerHeader>
                    Notifications
                </DrawerHeader>
                <DrawerBody>
                    <div className="flex flex-col gap-y-2">
                        {
                            notifications.length > 0 ?
                                notifications.map(({ message }) =>
                                    <div className="bg-light-dark-blue shadow-md rounded p-2 flex items-center justify-between">
                                        <div>
                                            <Icon
                                                as={GrStatusWarningSmall}
                                                className='text-orange-400 self-center'
                                            />
                                        </div>
                                        <div>
                                            {message}
                                        </div>
                                        <div>
                                            <CloseButton />
                                        </div>
                                    </div>)
                                :
                                "No notifications"
                        }
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}