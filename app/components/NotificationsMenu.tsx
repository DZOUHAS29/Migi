import { CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Notification } from '../interfaces';
import { getNotifications } from "../status-actions";
import { NotificationBody } from "./NotificationBody";
import { useNotifications } from "../contexts/notifications";


export const NotificationsMenu = ({ open, setOpen }: {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}) => {
    const { setNotifications, notifications } = useNotifications();

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