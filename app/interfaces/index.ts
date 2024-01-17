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

export interface StatsProps {
    date: string;
    overall: number;
    migraines: number;
    headaches: number;
    meds: number;
    part: {
        [key: string]: number;
        morning: number,
        afternoon: number,
        evening: number,
    }

}