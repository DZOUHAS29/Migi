"use client"
import 'chart.js/auto';
import { Button, Link, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useRecords } from '@/app/contexts/records';
import { useEffect, useState } from 'react';
import { getPrev } from '@/app/record-actions';
import moment from 'moment';
import { useCharts } from '@/app/contexts/charts';
import { useRouter } from 'next/navigation';

interface PrevProps {
    freq: number;
    migraines: number;
}

const Graphs = () => {
    const [prev, setPrev] = useState<PrevProps>({ freq: 0, migraines: 0 });
    const { records } = useRecords();
    const router = useRouter();

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

        const procenta = Math.ceil((current / last) * 100);

        if (current < last)
            return (
                <StatHelpText>
                    <StatArrow type="decrease" />
                    {100 - procenta}%
                </StatHelpText>
            )

        return (
            <StatHelpText>
                <StatArrow type="increase" />
                {procenta}%
            </StatHelpText>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                    <p className="text-2xl font-medium">
                        Week statistics
                    </p>
                </div>
                <div className='col-span-1 text-right self-center'>
                    <Button
                        variant={'link'}
                        textColor={"white"}
                        onClick={() => { router.push("/stats") }}
                    >
                        More
                    </Button>
                </div>
            </div>
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
            <div >

                <div>
                    <Bar data={{
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
                                    'rgba(141, 185, 184, 0.8)',
                                    'rgba(179, 216, 156, 0.8)',
                                    'rgba(208, 239, 177, 0.8)'
                                ],
                                borderColor: [
                                    '#8DB9B8',
                                    '#B3D89C',
                                    '#D0EFB1'
                                ],

                            },
                        ],
                    }}

                        options={{
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
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "white"
                                    }
                                }
                            }
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default Graphs