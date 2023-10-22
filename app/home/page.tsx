"use client"
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import moment from "moment";
import { DayCard } from "./components/DayCard";
import { Line } from "react-chartjs-2";
import { useCharts } from "../contexts/charts";
import 'chart.js/auto';

const options = {
    scales: {
        x: {
            grid: {
                color: "rgba(96, 165, 250, 0.3)",
            },
            ticks: {
                color: "rgba(96, 165, 250, 0.3)" 
            },
            title: {
                color: "rgba(96, 165, 250, 0.3)"  
            }
        },
        y: {
            grid: {
                color: "rgba(96, 165, 250, 0.3)",  
            },
            ticks: {
                color: "rgba(96, 165, 250, 0.3)"  
            },
            title: {
                color: "rgba(96, 165, 250, 0.3)"  
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
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 0.6)'
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
                <div className="flex pr-10 pl-10">
                    <div className="grid self-center rounded">
                        <text className="text-2xl font-mono text-center p-1 font-bold">
                            Měsíční přehled
                        </text>
                    </div>
                    <div className="grid flex-1 justify-end">
                        <Input type="month" className="border-blue-400 hover:border-blue-500 hover:text-blue-500" />
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
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}