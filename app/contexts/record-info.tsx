import { createContext, useContext, useState } from "react";
import { OpenModalProps, ProviderProps, RecordsProps } from "../interfaces";

const RecordInfoContext = createContext<OpenModalProps>({
    open: false,
    record: { date: new Date(), day_part: "", type: "", cause: "", meds: false },
    closeAdd: () => { },
    openAdd: () => { },
});

export const RecordInfoContextProvider = ({ children }: ProviderProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [record, setRecord] = useState<RecordsProps>({ date: new Date(), day_part: "", type: "", cause: "", meds: false });

    const openAdd = (param: RecordsProps | string): void => {
        setRecord(param as RecordsProps);
        setOpen(true);
    }

    const closeAdd = (): void => {
        setRecord({ date: new Date(), day_part: "", type: "", cause: "", meds: false });
        setOpen(false);
    }

    return (
        <RecordInfoContext.Provider
            value={{
                open: open,
                record: record,
                openAdd: openAdd,
                closeAdd: closeAdd
            }}
        >
            {children}
        </RecordInfoContext.Provider>
    );
}

export function useRecordInfo() {
    return useContext(RecordInfoContext);
}