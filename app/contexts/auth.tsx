import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { ProviderProps, User } from "../interfaces";

interface AuthProps {
    auth: User;
    setAuth: Dispatch<SetStateAction<User>>
}

const defaultUser = { id: -1, username: "", email: "" };

const AuthContext = React.createContext<AuthProps>({
    auth: defaultUser,
    setAuth: () => { }
});

export const AuthContextProvider = ({ children }: ProviderProps) => {
    const [auth, setAuth] = useState<User>(defaultUser);

    return (
        <AuthContext.Provider
            value={{
                auth: auth,
                setAuth: setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}