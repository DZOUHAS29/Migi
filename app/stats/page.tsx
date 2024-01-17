"use client"
import { Select, Stack } from '@chakra-ui/react'
import Statistics from './components/Statistics'
import { useEffect, useState } from 'react'
import { RecordsProps } from '../interfaces'
import { useRecords } from '../contexts/records'
import moment from 'moment'
import { StatsProps } from '../interfaces'

const options = [
    "week",
    "month",
    "year"
]

export default function Stats() {
    const [option, setOption] = useState<string>(options[0]);
    const [data, setData] = useState<RecordsProps[]>([]);
    const [statsData, setStatsData] = useState<StatsProps[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const { records } = useRecords();

    useEffect(() => {
        if (records.length > 0)
            setData(records);

        return () => {
            setData([]);
        }
    }, [])

    useEffect(() => {
        getDates();
        formatData();
    }, [data])

    const getDates = (): void => {
        let start = moment().startOf("week");
        let days: string[] = [];

        for (let i = 0; i < 7; i++) {
            days.push(start.format("YYYY-MM-DD"));
            start.add(1, "days");
        }

        setDates(days);
    };

    const formatData = (): void => {
        if (data.length <= 0)
            return;

        const stats: StatsProps[] = data.reduce((summary: StatsProps[], { date, type, day_part, meds }: RecordsProps) => {
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
            <div className='p-2 flex space-x-2 pl-9'>
                <div className='w-1/12'>
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
            <div className='h-full'>
                <Statistics records={data} dates={dates} statsData={statsData} />
            </div>
        </div>
    )
}
