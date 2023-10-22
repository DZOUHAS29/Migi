import { createContext, useContext, useState } from "react";

type ChartsContextType = {
    data: object,
    setData: (data: any) => void
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

export const ChartsContextProvider = (props: any) => {
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
            {props.children}
        </ChartsContext.Provider>
    )
}

export const useCharts = (): ChartsContextType => {
    return useContext(ChartsContext);
}