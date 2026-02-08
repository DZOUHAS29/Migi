"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import { useCharts } from "../../../contexts/charts";
import { DayCard } from "./DayCard";
import { AddDataContextProvider } from "../../../contexts/add-data";
import AddRecord from "./AddRecords";
import { Input } from "@chakra-ui/react";
import { FiSunrise } from "@react-icons/all-files/fi/FiSunrise";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiSunset } from "@react-icons/all-files/fi/FiSunset";
import { getRecords } from "@/app/record-actions";
import { RecordsProps } from "@/app/interfaces";
import RecordInfo from "../day-card-comps/RecordInfo";
import { useRecords } from "@/app/contexts/records";

export const Calendar = () => {
    const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [dates, setDates] = useState<string[]>([]);
    const { setRecords, records } = useRecords();

    const getDates = (): void => {
        let start = moment(date).startOf("week");
        let days: string[] = [];

        for (let i = 0; i < 7; i++) {
            days.push(start.format("YYYY-MM-DD"));
            start.add(1, "days");
        }

        setDates(days);
    };

    const getData = async (): Promise<void> => {
        if (dates.length <= 0)
            return;

        const data = await getRecords(dates);

        if (data === 500)
            return;

        setRecords(data as RecordsProps[]);

    };

    useEffect(() => {
        getDates();
    }, [date])

    useEffect(() => {
        getData();
    }, [dates])

    return (
        <AddDataContextProvider>
            <div className="flex flex-col">
                <div className="grid">
                    <div className="flex">
                        <div className="grid self-center rounded">
                            <p className="text-2xl text-center p-1 font-medium">
                                Week overview
                            </p>
                        </div>
                        <div className="grid flex-1 justify-end">
                            <Input
                                type="date"
                                variant={"unstyled"}
                                value={date}
                                className="hover:cursor-pointer hover:bg-air-blue calendar p-1"
                                onChange={event => { setDate(event.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 pt-2 justify-items-center">
                    <div className="col-span-1">

                    </div>
                    <div className="col-span-2 text-xl">
                        <FiSunrise />
                    </div>
                    <div className="col-span-2 text-xl">
                        <FiSun />
                    </div>
                    <div className="col-span-2 text-xl">
                        <FiSunset />
                    </div>
                </div>
                <div className="grid pt-1 pb-1">
                    <div className="flex flex-col">
                        {
                            dates?.map((day, i) =>
                                <div className="grid" key={i}>
                                    <DayCard day={day} records={records.filter(record => moment(record.date).format("YYYY-MM-DD") === day)} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <AddRecord />
            <RecordInfo />
        </AddDataContextProvider >
    )
}
