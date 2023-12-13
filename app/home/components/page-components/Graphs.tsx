"use client"
import 'chart.js/auto';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { PolarArea } from "react-chartjs-2";

const Graphs = () => {
    return (
        <div className='flex flex-col'>
            <div className='grid'>
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
            <div className='grid'>
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
        </div>
    )
}

export default Graphs