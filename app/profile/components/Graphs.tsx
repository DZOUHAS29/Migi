import { GraphProps } from '@/app/interfaces'
import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    ArcElement,
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Graphs = (data: GraphProps) => {
    return (
        <div className='flex'>
            <div>
                <Doughnut
                    data={{
                        labels: ["Morning", "Afternoon", "Evening"],
                        datasets: [{
                            label: 'Count',
                            data: data?.parts.map(part => part),
                            backgroundColor: [
                                'rgba(141, 185, 184, 1)',
                                'rgba(179, 216, 156, 1)',
                                'rgba(208, 239, 177, 1)'
                            ],
                            borderColor: [
                                'rgba(141, 185, 184, 1)',
                                'rgba(179, 216, 156, 1)',
                                'rgba(208, 239, 177, 1)'
                            ],
                            hoverOffset: 4
                        }]
                    }}

                    options={{
                        color: "white"
                    }}
                />
            </div>
            <div>
                <Bar
                    data={{
                        labels: ["Migraines", "Headaches"],
                        datasets: [
                            {
                                label: 'Frequency',
                                data: data.types.map(type => type),
                                backgroundColor: ['rgba(208, 239, 177, 0.8)', 'rgba(141, 185, 184, 0.8)'],
                            },
                        ],
                    }}

                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
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
    )
}
