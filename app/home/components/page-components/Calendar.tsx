"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import { useCharts } from "../../../contexts/charts";
import { DayCard } from "./DayCard";
import { AddDataContextProvider } from "../../../contexts/add-data";
import AddRecord from "./AddRecords";


export const Calendar = () => {
    const [month, setMonth] = useState<string>(moment().format("YYYY-MM"));
    const [dates, setDates] = useState<string[]>([]);
    const { setData } = useCharts();

    const getDates = (): void => {
        let start = moment(`${month}-1`);
        let end = moment(`${month}-1`).daysInMonth();
        let days: string[] = [];

        for (let i = 0; i < end; i++) {
            days.push(start.format("YYYY-MM-DD"));
            start.add(1, "days");
        }

        setDates(days);
    };

    useEffect(() => {
        getDates();
    }, [month])

    useEffect(() => {
        if (dates.length <= 0)
            return;

        setData({
            labels: dates.map(day => moment(day).format("DD.MM.")),
            datasets: [
                {
                    label: "Migraines",
                    data: dates.map(day => Math.random() * 6),
                    tension: 0.2,
                    backgroundColor: 'rgb(96 165 250)',
                    borderColor: 'rgb(96 165 250)'
                }
            ]
        });
    }, [dates]);

    return (
        <AddDataContextProvider>
            <div className="flex flex-col">
                <div className="grid">
                    <div className="flex pb-1 pl-9 pr-1 w-8/12">
                        <div className="grid self-center rounded">
                            <p className="text-2xl text-center p-1">
                                Monthly overview
                            </p>
                        </div>
                        <div className="grid flex-1 justify-end">
                            <input
                                type="month"
                                value={month}
                                className="rounded pl-1 pr-1 bg-blue-200"
                                onChange={event => { setMonth(event.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className="flex flex-col">
                        {
                            dates?.map((day, i) => <div className="grid p-1 pl-10" key={i}><DayCard day={day} /></div>)
                        }
                    </div>
                </div>
            </div>
            <AddRecord />
        </AddDataContextProvider >
    )
}
