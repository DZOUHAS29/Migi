"use client"
import { StatsProps } from '@/app/interfaces'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

export const ProfileGraphs = () => {
    const [current, setCurrent] = useState<StatsProps>(); 
    const [previous, setPrevious] = useState<StatsProps>();

    useEffect(() => {
      
    }, [])

    const getPreviousMonth = () => {}

    const formatData = () => {}
    
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
