"use client"
import { Component, useEffect, useState } from "react";
import moment from "moment";
import { DayCard } from "./components/DayCard";
import { Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import { useCharts } from "../contexts/charts";
import 'chart.js/auto';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

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
    const [month, setMonth] = useState<string>(moment().format("YYYY-MM"));
    const { data, setData } = useCharts();
    const [dates, setDates] = useState<string[]>([]);

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

    return (
        <div className="flex-row">
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
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>
                                            Frequency of headaches
                                        </StatLabel>
                                        <StatNumber>
                                            15
                                        </StatNumber>
                                        <StatHelpText>
                                            <StatArrow type="increase" />
                                            10%
                                        </StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>
                                            Migraines
                                        </StatLabel>
                                        <StatNumber>
                                            4
                                        </StatNumber>
                                        <StatHelpText>
                                            <StatArrow type="decrease" />
                                            3%
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </div>
                            <div className="grid">
                                <PolarArea data={{
                                    labels: [
                                        'Morning',
                                        'Afternoon',
                                        'Evening',
                                    ],
                                    datasets: [{
                                        label: 'My First Dataset',
                                        data: [11, 16, 7],
                                        backgroundColor: [
                                            'rgb(249, 249, 249)',
                                            'rgb(255, 228, 94)',
                                            'rgb(255, 99, 146)',
                                        ]
                                    }]
                                }} />
                            </div>
                            <div className="grid">
                                <p className="text-1xl p-1">
                                    Last records
                                </p>
                            </div>
                            <div className="grid">
                                <p className="text-center text-sm p-1">
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