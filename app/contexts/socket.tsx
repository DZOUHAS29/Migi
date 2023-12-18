import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ProviderProps } from "../interfaces";

interface SocketProp {
    socket: Socket | null;
}

const SocketContext = createContext<SocketProp>({
    socket: null
});

export const SocketContextProvider = ({ children }: ProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (socket)
            return;

        setSocket(io("http://localhost:3001"));
    }, [socket])

    return (
        <SocketContext.Provider
            value={{
                socket: socket
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    return useContext(SocketContext);
}