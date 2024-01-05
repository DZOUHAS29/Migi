import { Dispatch, createContext, useContext, useState } from "react";
import { ProviderProps, RecordsProps } from "../interfaces"

interface RecordsContextProps {
    records: RecordsProps[];
    setRecords: React.Dispatch<React.SetStateAction<RecordsProps[]>>;
}

const RecordsContext = createContext<RecordsContextProps>({
    records: [],
    setRecords: () => { }
});

export const RecordsContextProvider = ({ children }: ProviderProps) => {
    const [records, setRecords] = useState<RecordsProps[]>([]);

    return (
        <RecordsContext.Provider
            value={{
                records: records,
                setRecords: setRecords
            }}
        >
            {children}
        </RecordsContext.Provider>
    )
}

export function useRecords() {
    return useContext(RecordsContext);
}