"use client"
import 'chart.js/auto';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { useRecords } from '@/app/contexts/records';
import { useEffect, useState } from 'react';
import { getPrev } from '@/app/record-actions';
import moment from 'moment';
import { useCharts } from '@/app/contexts/charts';

interface PrevProps {
    freq: number;
    migraines: number;
}

const Graphs = () => {
    const [prev, setPrev] = useState<PrevProps>({ freq: 0, migraines: 0 });
    const { records } = useRecords();

    const prevData = async (): Promise<void> => {
        if (records.length <= 0)
            return;

        const data = await getPrev(moment(records[0].date).format("YYYY-MM-DD"));

        if (data === 500 || data === 400)
            return;

        setPrev(data as PrevProps);
    }

    useEffect(() => {
        prevData();
    }, [records])

    const generateDiff = (current: number, last: number) => {
        if (last === 0)
            return (
                <StatHelpText>
                    <StatArrow type='increase' />
                    0%
                </StatHelpText>
            )

        const procenta = (current / last) * 100;

        if (current < last)
            return (
                <StatHelpText>
                    <StatArrow type="decrease" />
                    {Math.abs(Math.ceil(procenta))}%
                </StatHelpText>
            )

        return (
            <StatHelpText>
                <StatArrow type="increase" />
                {Math.abs(Math.ceil(procenta))}%
            </StatHelpText>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className='p-2'>
                <StatGroup>
                    <Stat>
                        <StatLabel>
                            Frequency of headaches
                        </StatLabel>
                        <StatNumber>
                            {
                                records?.length
                            }
                        </StatNumber>
                        {
                            generateDiff(records.length, prev.freq)
                        }
                    </Stat>
                    <Stat>
                        <StatLabel>
                            Migraines
                        </StatLabel>
                        <StatNumber>
                            {
                                records?.filter(({ type }) => type === "Migraine").length
                            }
                        </StatNumber>
                        {
                            generateDiff(records.filter(({ type }) => type === "Migraine").length, prev.migraines)
                        }
                    </Stat>
                </StatGroup>
            </div>
            <div className="grid grid-cols-8 h-96 lg:pl-9">
                <div className='col-span-1'>

                </div>
                <div className='col-span-6'>
                    <Doughnut data={{
                        labels: ["Morning", "Afternoon", "Evening"],
                        datasets: [
                            {
                                label: "Počet tento týden",
                                data: [
                                    records?.filter(({ day_part }) => day_part === "Morning").length,
                                    records?.filter(({ day_part }) => day_part === "Afternoon").length,
                                    records?.filter(({ day_part }) => day_part === "Evening").length
                                ],
                                backgroundColor: [
                                    '#8DB9B8',
                                    '#B3D89C',
                                    '#D0EFB1'
                                ],
                                borderColor: [
                                    '#8DB9B8',
                                    '#B3D89C',
                                    '#D0EFB1'
                                ],
                            }
                        ]
                    }}

                        options={{
                            color: "white",
                        }}

                    />
                </div>
                <div className='col-span-1'>

                </div>
            </div>
        </div>
    )
}

export default Graphs