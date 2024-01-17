import { RecordsProps } from '@/app/interfaces'
import { Line, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import moment from 'moment';
import { StatsProps } from '@/app/interfaces';

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

interface Props {
    records: RecordsProps[];
    dates: string[];
    statsData: StatsProps[];
}

export default function Statistics({ records, dates, statsData }: Props) {
    return (
        <div className='grid grid-cols-9 grid-rows-6 h-full pl-9 pr-9'>
            <div className='col-span-9 row-span-3 p-2'>
                <div className='h-full flex flex-col'>
                    <div className='font-semibold'>
                        How frequent your problems are
                    </div>
                    <div className='h-full'>
                        <Line
                            data={{
                                labels: dates.map(date => moment(date).format("MM/DD/YYYY")),
                                datasets: [
                                    {
                                        label: 'Overall',
                                        data: statsData.map(data => data.overall),
                                        borderColor: 'rgba(141, 185, 184, 1)',
                                        backgroundColor: 'rgba(141, 185, 184, 1)',
                                    },
                                    {
                                        label: 'Migraines',
                                        data: statsData.map(data => data.migraines),
                                        borderColor: 'rgba(179, 216, 156, 1)',
                                        backgroundColor: 'rgba(179, 216, 156, 1)',
                                    },
                                    {
                                        label: 'Headaches',
                                        data: statsData.map(data => data.headaches),
                                        borderColor: 'rgba(208, 239, 177, 1)',
                                        backgroundColor: 'rgba(208, 239, 177, 1)',
                                    },
                                ],
                            }}

                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
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
            <div className='col-span-9 row-span-3 row-start-4'>
                <div className='flex h-full gap-16'>
                    <div>
                        <span className='font-semibold'>Headaches vs Migraines</span>
                        <Bar
                            data={{
                                labels: ["Migraines", "Headaches"],
                                datasets: [
                                    {
                                        label: 'Frequency',
                                        data: [
                                            statsData.reduce((sum, { migraines }) => {
                                                return sum + migraines;
                                            }, 0)
                                            ,
                                            statsData.reduce((sum, { headaches }) => {
                                                return sum + headaches;
                                            }, 0)
                                        ],
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
                    <div>
                        <span className='font-semibold'>When it occures</span>
                        <Bar
                            data={{
                                labels: ["Morning", "Afternoon", "Evening"],
                                datasets: [
                                    {
                                        label: 'Frequency',
                                        data: [
                                            statsData.reduce((sum, { part: { morning } }) => {
                                                return sum + morning;
                                            }, 0),
                                            statsData.reduce((sum, { part: { afternoon } }) => {
                                                return sum + afternoon;
                                            }, 0),
                                            statsData.reduce((sum, { part: { evening } }) => {
                                                return sum + evening;
                                            }, 0)
                                        ],
                                        backgroundColor: ['rgba(179, 216, 156, 0.8)', 'rgba(141, 185, 184, 0.8)', 'rgba(208, 239, 177, 0.8)'],
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
                    <div className='flex-grow'>
                        <span className='font-semibold'>How often you take medicine</span>
                        <Line
                            data={{
                                labels: dates.map(date => moment(date).format("MM/DD/YYYY")),
                                datasets: [
                                    {
                                        label: 'Meds',
                                        data: statsData.map(data => data.meds),
                                        borderColor: 'rgba(208, 239, 177, 1)',
                                        backgroundColor: 'rgba(208, 239, 177, 1)',
                                    },
                                ],
                            }}

                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom' as const,
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
        </div >
    )
}
