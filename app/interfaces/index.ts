import { ReactNode } from "react";

export interface RecordsProps {
    id: number;
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

export interface User {
    id: number | string;
    username: string;
    email: string;
    password?: string;
}

export interface Output {
    message: string;
    variant: string;
    user?: User;
    record?: RecordsProps;
    notification?: Notification;
}

export interface Notification {
    id: number;
    message: string;
    date: Date;
}

export interface GraphProps {
    parts: number[],
    types: number[]
}