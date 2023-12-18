import { createContext, useContext, useState } from "react";
import { ProviderProps } from "../interfaces";

type ChartsContextType = {
    data: object,
    setData: (data: ChartData) => void
}

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        tension?: number,
        backgroundColor?: string,
        borderColor?: string
    }[];
    options?: object
};

const ChartsContext = createContext<ChartsContextType>({
    data: {},
    setData: () => { }
});

export const ChartsContextProvider = ({ children }: ProviderProps)  => {
    const [data, setData] = useState<ChartData>({
        labels: [""],
        datasets: [
            {
                label: "",
                data: [],
                tension: 0.2,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 0.6)'
            }
        ],
    });

    return (
        <ChartsContext.Provider
            value={{
                data: data,
                setData: setData
            }}
        >
            {children}
        </ChartsContext.Provider>
    )
}

export const useCharts = (): ChartsContextType => {
    return useContext(ChartsContext);
}