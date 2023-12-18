import { ReactNode } from "react";

export interface RecordsProps {
    date: Date;
    type: string;
    day_part: string;
    cause: string;
    meds: boolean;
}

export interface ProviderProps {
    children: ReactNode;
};

export interface OpenModalProps {
    open: boolean;
    openAdd: (param: string | RecordsProps) => void;
    closeAdd: () => void;
    record?: RecordsProps;
    date?: string;
};