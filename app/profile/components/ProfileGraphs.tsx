"use client"
import { GraphProps, RecordsProps, StatsProps } from '@/app/interfaces'
import { retrieveDays } from '@/app/middleware/retrieveDays'
import { retrieveStats } from '@/app/middleware/retrieveStats'
import { getRecords, monthlyCount } from '@/app/record-actions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Graphs } from './Graphs'
import { Line } from 'react-chartjs-2'


const defaultStat = {
    parts: [],
    types: []
}

export const ProfileGraphs = () => {
    const [current, setCurrent] = useState<GraphProps>(defaultStat);
    const [previous, setPrevious] = useState<GraphProps>(defaultStat);
    const [year, setYear] = useState<number[]>([]);

    useEffect(() => {
        init();
    }, [])

    const getPreviousMonth = async (): Promise<void> => {
        const dayOfMonth = moment().startOf("month").subtract(1, "day").format("YYYY-MM-DD");
        const days = retrieveDays(dayOfMonth, "month");

        const data = await getData(days);

        if (typeof data === "string")
            return;

        const stats = retrieveStats(data, days);

        if (!stats)
            return;

        const formattedStats = formatData(stats);

        setPrevious(formattedStats);
    }

    const getcurrentMonth = async (): Promise<void> => {
        const dayOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const days = retrieveDays(dayOfMonth, "month");

        const data = await getData(days);

        if (typeof data === "string")
            return;

        const stats = retrieveStats(data, days);

        if (!stats)
            return;

        const formattedStats = formatData(stats);

        setCurrent(formattedStats);
    }

    const getData = async (days: string[]): Promise<RecordsProps[] | string> => {
        const data = await getRecords(days);

        if (typeof data === "number")
            return "records not found - something went wrong";

        return data;
    }

    const formatData = (stats: StatsProps[]): GraphProps => {
        const parts = [
            stats.filter(({ part: { morning } }) => morning > 0).length,
            stats.filter(({ part: { afternoon } }) => afternoon > 0).length,
            stats.filter(({ part: { evening } }) => evening > 0).length,
        ]

        const types = [
            stats.filter(({ headaches }) => headaches > 0).length,
            stats.filter(({ migraines }) => migraines > 0).length
        ]

        return { parts, types };
    }

    const getMonthlyStats = async (): Promise<void> => {
        const data = await monthlyCount();

        if (typeof data === "number")
            return;

        setYear(data);
    }

    const init = (): void => {
        getPreviousMonth();
        getcurrentMonth();
        getMonthlyStats();
    }

    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex flex-col'>
                    <div className='text-xl font-semibold'>
                        Your statistics throughout the year
                    </div>
                    <div>
                        <Line
                            data={{
                                labels: moment.monthsShort(),
                                datasets: [
                                    {
                                        label: 'Overall',
                                        data: year.map(data => data),
                                        borderColor: 'rgba(208, 239, 177, 1)',
                                        backgroundColor: 'rgba(208, 239, 177, 1)',
                                    },
                                ],
                            }}

                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        position: 'top' as const,
                                        labels: {
                                            color: "white"
                                        }
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: "rgba(255, 255, 255, 0.6)",
                                        },
                                        ticks: {
                                            color: "white",
                                            callback: function (value) {
                                                if (Number.isInteger(value)) {
                                                    return value;
                                                }
                                            },
                                        },
                                    },
                                    x: {
                                        grid: {
                                            color: "rgba(255, 255, 255, 0.6)",
                                        },
                                        ticks: {
                                            color: "white",
                                        }
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className=' flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                    <div className='text-xl font-semibold'>
                        Your statistics this month
                    </div>
                    <Graphs parts={current.parts} types={current.types} />
                </div>
                <div className='flex flex-col'>
                    <div className='text-xl font-semibold'>
                        Your statistics last month
                    </div>
                    <Graphs parts={previous.parts} types={previous.types} />
                </div>
            </div>
        </div>
    )
}
