import { Component, useEffect, useState } from "react";
import moment from "moment";
import { DayCard } from "./components/DayCard";
import { Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import { useCharts } from "../contexts/charts";
import 'chart.js/auto';

const options = {
    scales: {
        x: {
            grid: {
                color: "rgb(2 6 23)",
            },
            ticks: {
                color: "rgb(96 165 250)"
            },
            title: {
                color: "rgb(96 165 250)"
            }
        },
        y: {
            grid: {
                color: "rgb(2 6 23)",
            },
            ticks: {
                color: "rgb(96 165 250)"
            },
            title: {
                color: "rgb(96 165 250)"
            }
        }
    }
};

export default function Page() {
    const { data, setData } = useCharts();
    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
        getDates();
    }, [])

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

    const getDates = (): void => {
        let start = moment().startOf("month");
        let end: number = moment().daysInMonth();
        let days: string[] = [];

        for (let i = 0; i < end; i++) {
            days.push(start.format("YYYY-MM-DD"));
            start.add(1, "days");
        }

        setDates(days);
    };

    return (
        <div className="flex-row">
            <div className="grid">
                <div className="flex pb-1 pl-9 pr-1 w-8/12">
                    <div className="grid self-center rounded">
                        <p className="text-2xl font-mono text-center p-1 font-bold">
                            Monthly overview
                        </p>
                    </div>
                    <div className="grid flex-1 justify-end">
                        <input
                            type="month"
                            className="bg-slate-900 rounded border-blue-400 hover:border-blue-500
                             hover:text-blue-500 font-mono"
                        />
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="flex">
                    <div className="grid w-8/12">
                        <div className="flex flex-wrap pl-8">
                            {
                                dates?.map((day, i) => <div className="grid p-1" key={i} style={{ width: "14.28%" }}><DayCard day={day} /></div>)
                            }
                        </div>
                    </div>
                    <div className="grid flex-grow p-1">
                        <div className="flex-row">
                            <div className="grid">
                                <p className="text-1xl font-mono p-1 font-semibold">
                                    Monthly graph
                                </p>
                            </div>
                            <div className="grid">
                                <Line data={data} options={options} />
                            </div>
                            <div className="grid">
                                <p className="text-1xl font-mono p-1 font-semibold">
                                    Last records
                                </p>
                            </div>
                            <div className="grid">
                                <p className="text-center text-sm p-1 font-mono">
                                    No records found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}