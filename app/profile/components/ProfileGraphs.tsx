"use client"
import { RecordsProps, StatsProps } from '@/app/interfaces'
import { retrieveDays } from '@/app/middleware/retrieveDays'
import { retrieveStats } from '@/app/middleware/retrieveStats'
import { getRecords } from '@/app/record-actions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface GraphProps {
    parts: {
        mornings: number;
        afternoons: number;
        evenings: number;
    },
    types: {
        headaches: number;
        migraines: number;
    }
}

const defaultStat = {
    parts: {
        mornings: 0,
        afternoons: 0,
        evenings: 0,
    },
    types: {
        headaches: 0,
        migraines: 0,
    }
}

export const ProfileGraphs = () => {
    const [current, setCurrent] = useState<GraphProps>(defaultStat);
    const [previous, setPrevious] = useState<GraphProps>(defaultStat);

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
        const parts = {
            mornings: stats.filter(({ part: { morning } }) => morning > 0).length,
            afternoons: stats.filter(({ part: { afternoon } }) => afternoon > 0).length,
            evenings: stats.filter(({ part: { evening } }) => evening > 0).length,
        }

        const types = {
            headaches: stats.filter(({ headaches }) => headaches > 0).length,
            migraines: stats.filter(({ migraines }) => migraines > 0).length
        }

        return { parts, types };
    }

    const init = (): void => {
        const last = getPreviousMonth();
        const current = getcurrentMonth();
    }

    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <div>
                    {
                        (() => {
                            if (current && current.parts) {
                                return (
                                    <Doughnut
                                        data={{
                                            labels: Object.keys(current.parts).map(part => part),
                                            datasets: [{
                                                label: 'ahoj',
                                                data: Object.keys(current.parts).map(part => current.parts[part as keyof typeof current.parts]),
                                                backgroundColor: [
                                                    'rgb(255, 99, 132)',
                                                    'rgb(54, 162, 235)',
                                                    'rgb(255, 205, 86)'
                                                ],
                                                hoverOffset: 4
                                            }]
                                        }}
                                    />
                                );
                            }
                        })()
                    }
                </div>
                <div>
                    {/*  Type <Bar /> */}
                </div>
            </div>
            <div>
                {/* mesice <Line /> */}
            </div>
        </div>
    )
}
