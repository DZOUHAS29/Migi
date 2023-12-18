import { createContext, useContext, useState } from "react";
import { ProviderProps } from "../interfaces";

interface AddDataProps {
    date: string;
    open: boolean;
    openAdd: (date: string) => void;
    closeAdd: () => void;
};

const AddDataContext = createContext<AddDataProps>({
    date: "",
    open: false,
    openAdd: () => { },
    closeAdd: () => { }
});

export const AddDataContextProvider = ({ children }: ProviderProps) => {
    const [date, setDate] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const openAdd = (date: string): void => {
        setDate(date);
        setOpen(true);
    }

    const closeAdd = (): void => {
        setDate("");
        setOpen(false);
    }

    return (
        <AddDataContext.Provider
            value={{
                date: date,
                open: open,
                openAdd: openAdd,
                closeAdd: closeAdd
            }}
        >
            {children}
        </AddDataContext.Provider>
    );
}

export const useAddData = () => {
    return useContext(AddDataContext);
}