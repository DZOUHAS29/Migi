import { createContext, useContext, useState } from "react";
import { Notification, ProviderProps } from "../interfaces"

interface NotificationsContextProps {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationsContext = createContext<NotificationsContextProps>({
    notifications: [],
    setNotifications: () => { }
});

export const NotificationsContextProvider = ({ children }: ProviderProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    return (
        <NotificationsContext.Provider
            value={{
                notifications: notifications,
                setNotifications: setNotifications
            }}
        >
            {children}
        </NotificationsContext.Provider>
    )
}

export function useNotifications() {
    return useContext(NotificationsContext);
}