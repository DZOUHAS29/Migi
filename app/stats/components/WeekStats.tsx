import { Line, Bar } from 'react-chartjs-2'

export default function WeekStats() {
    return (
        <div className='flex'>
            <div>
                <Line data={{
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [
                        {
                            label: 'My Line Dataset',
                            data: [6, 10, 27, 3, 10],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                }} />
            </div>
            <div>
                <Bar
                    data={{
                        labels: ['Label 1', 'Label 2', 'Label 3'],
                        datasets: [
                            {
                                label: 'My Dataset',
                                data: [10, 20, 15],
                                backgroundColor: ['red', 'green', 'blue'],
                            },
                        ],
                    }}
                />
            </div>
            <div>
                <Line data={{
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [
                        {
                            label: 'My Line Dataset',
                            data: [6, 10, 27, 3, 10],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                }} />
            </div>
        </div>
    )
}
