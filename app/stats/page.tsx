"use client"
import { Input, Select, Stack } from '@chakra-ui/react'
import Statistics from './components/Statistics'
import { useEffect, useState } from 'react'
import { RecordsProps } from '../interfaces'
import { useRecords } from '../contexts/records'
import moment from 'moment'
import { StatsProps } from '../interfaces'
import { getFilters, getRecords } from '../record-actions'

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
        formatData(filteredData);
    }, [selectedFilter])

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
        if (selectedFilter !== "All")
            return setFilteredData(data.filter(record => record.cause === selectedFilter));

        setFilteredData([]);
    }

    const getDates = (): void => {
        let start = moment(date).startOf(option as moment.unitOfTime.StartOf);
        let days: string[] = [];

        let length;

        switch (option) {
            case "week":
                length = 7;
                break;

            case "month":
                length = moment(date).daysInMonth();
                break;

            case "year":
                length = moment(date).isLeapYear() ? 366 : 365;;
                break;

            default:
                length = 7;
                break;
        }

        for (let i = 0; i < length; i++) {
            days.push(start.format("YYYY-MM-DD"));
            start.add(1, "days");
        }

        setDates(days);
    };

    const formatData = (array: RecordsProps[]): void => {
        if (array.length <= 0)
            return setStatsData([]);

        const stats: StatsProps[] = array.reduce((summary: StatsProps[], { date, type, day_part, meds }: RecordsProps) => {
            const exists = summary.find(item => item.date === moment(date).format("YYYY-MM-DD"));
            const info = exists || { date: moment(date).format("YYYY-MM-DD"), overall: 0, headaches: 0, migraines: 0, meds: 0, part: { morning: 0, afternoon: 0, evening: 0 } };

            info.overall += 1;

            info.part[day_part.toLocaleLowerCase()] += 1;

            if (type === "Migraine")
                info.migraines += 1;
            else
                info.headaches += 1;

            if (meds)
                info.meds += 1;

            if (!exists)
                summary.push(info as StatsProps);

            return summary;
        }, []);

        dates.map(date => {
            if (stats.find(item => item.date === date))
                return;

            stats.push({ date, overall: 0, headaches: 0, migraines: 0, meds: 0, part: { morning: 0, afternoon: 0, evening: 0 } });
        });

        const sorted: StatsProps[] = stats.sort((a: StatsProps, b: StatsProps) => {
            return moment(a.date).get('date') - moment(b.date).get('date')
        });

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
                <Statistics records={filteredData.length > 0 ? filteredData : data} dates={dates} statsData={statsData} />
            </div>
        </div>
    )
}
