"use client"
import 'chart.js/auto';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";

const Graphs = () => {
    return (
        <div className='flex flex-col'>
            <div className='p-2'>
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
            <div className="grid grid-cols-8 h-96 lg:pl-9">
                <div className='col-span-1'>

                </div>
                <div className='col-span-6'>
                    <Doughnut data={{
                        labels: [
                            'Morning',
                            'Afternoon',
                            'Evening',
                        ],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [11, 16, 7],
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
                        }]
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