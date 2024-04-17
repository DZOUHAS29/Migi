import { CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Notification } from '../interfaces';
import { getNotifications } from "../status-actions";
import { GrStatusWarningSmall } from "@react-icons/all-files/gr/GrStatusWarningSmall";
import { useSocket } from "../contexts/socket";
import { NotificationBody } from "./NotificationBody";

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

        socket?.on("remove-notification", ({ id }) => {
            if (!id)
                return;

            setNotifications(notifications => notifications.filter(item => item.id !== id));
        });

        return () => {
            socket?.off("new-notification");
            socket?.off("remove-notification");
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
            <DrawerContent className="bg-ucla-blue rounded">
                <DrawerCloseButton />
                <DrawerHeader>
                    Notifications
                </DrawerHeader>
                <DrawerBody>
                    <div className="flex flex-col gap-y-2">
                        {
                            notifications.length > 0 ?
                                notifications.map(({ id, message }) => <NotificationBody key={id} message={message} id={id} />)
                                :
                                "No notifications"
                        }
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}