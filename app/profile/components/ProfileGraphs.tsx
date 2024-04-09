"use client"
import { RecordsProps, StatsProps } from '@/app/interfaces'
import { retrieveDays } from '@/app/middleware/retrieveDays'
import { retrieveStats } from '@/app/middleware/retrieveStats'
import { getRecords } from '@/app/record-actions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

export const ProfileGraphs = () => {
    const [current, setCurrent] = useState<StatsProps>();
    const [previous, setPrevious] = useState<StatsProps>();

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

        console.log("ahoj");
    }

    const getcurrentMonth = async (): Promise<void> => {
        const dayOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const days = retrieveDays(dayOfMonth, "month");

        const data = await getData(days);

        if (typeof data === "string")
            return;

        const stats = retrieveStats(data, days);

        console.log("ahoj");
    }

    const getData = async (days: string[]): Promise<RecordsProps[] | string> => {
        const data = await getRecords(days);

        if (typeof data === "number")
            return "records not found - something went wrong";

        return data;
    }

    const formatData = (stats: StatsProps[]) => {
        const mornings = stats.filter(({ part: { morning } }) => { })
    }

    const init = (): void => {
        const last = getPreviousMonth();
        const current = getcurrentMonth();
    }

    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <div>
                    {/* Dayparts <Doughnut /> */}
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
