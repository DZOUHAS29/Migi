"use client"
import { Input, Select, Stack } from '@chakra-ui/react'
import Statistics from './components/Statistics'
import { useEffect, useState } from 'react'
import { RecordsProps } from '../interfaces'
import { useRecords } from '../contexts/records'
import moment from 'moment'
import { StatsProps } from '../interfaces'
import { getFilters, getRecords } from '../record-actions'
import { retrieveDays } from '../middleware/retrieveDays'
import { retrieveStats } from '../middleware/retrieveStats'

const options = [
    "week",
    "month",
    "year"
]

export default function Stats() {
    const [option, setOption] = useState<string>(options[0]);
    const [data, setData] = useState<RecordsProps[]>([]);
    const [filteredData, setFilteredData] = useState<RecordsProps[]>([]);
    const [statsData, setStatsData] = useState<StatsProps[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [filters, setFilters] = useState<string[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>("All");
    const { records } = useRecords();

    useEffect(() => {
        fetchFilter();
    }, [])

    useEffect(() => {
        getDates();
    }, [date, option])

    useEffect(() => {
        fetchRecords();
    }, [dates])

    useEffect(() => {
        formatData(data);
    }, [data])

    useEffect(() => {
        filterRecords();
    }, [selectedFilter])

    useEffect(() => {
        formatData(filteredData);
    }, [filteredData])

    const fetchRecords = async (): Promise<void> => {
        if (dates.length <= 0)
            return;

        const data = await getRecords(dates);

        setData(data as RecordsProps[]);
    }

    const fetchFilter = async (): Promise<void> => {
        const data = await getFilters();

        setFilters(["All", ...data as string[]]);
    }

    const filterRecords = (): void => {
        if (selectedFilter === "All")
            return setFilteredData(data);

        return setFilteredData(data.filter(record => record.cause === selectedFilter));

    }

    const getDates = (): void => {
        const days = retrieveDays(date, option);

        setDates(days);
    };

    const formatData = (array: RecordsProps[]): void => {
        const sorted = retrieveStats(array, dates);

        if (!sorted)
            return setStatsData([]);

        setStatsData(sorted);
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className='p-2 flex space-x-2 pl-10 justify-between pr-10'>
                <div className='flex gap-x-2'>
                    <div>
                        <Select
                            onChange={event => { setOption(event.target.value) }}
                            value={option}
                        >
                            {
                                options.map((option, i) => <option key={i} value={option} className='text-black'>{option[0].toUpperCase() + option.substring(1, option.length)}</option>)
                            }
                        </Select>
                    </div>
                    <div className='self-center text-xl'>
                        <span>
                            Statistics
                        </span>
                    </div>
                </div>
                <div className='flex gap-x-2'>
                    <div>
                        <Select
                            value={selectedFilter}
                            onChange={event => { setSelectedFilter(event.target.value) }}
                        >
                            {
                                filters?.map((filter, i) => <option key={i} value={filter} className='text-black'>{filter}</option>)
                            }
                        </Select>
                    </div>
                    <div>
                        <Input
                            type='date'
                            className='calendar'
                            value={date}
                            onChange={event => { setDate(event.target.value) }}
                        />
                    </div>
                </div>
            </div>
            <div className='h-full'>
                <Statistics records={filteredData} dates={dates} statsData={statsData} />
            </div>
        </div>
    )
}
