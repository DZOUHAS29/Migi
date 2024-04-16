"use server"
import { cookies } from 'next/headers';
import { Output, RecordsProps } from './interfaces';
import prisma from '@/prisma-client';
import moment from 'moment';
import { createObjectCsvWriter } from 'csv-writer';

interface PrevProps {
    freq: number;
    migraines: number;
}

interface FormatProps {
    date: string;
    type: string;
    cause: string;
    time: string;
    meds: string;
}

export const addRecord = async (formData: FormData): Promise<Output> => {
    const date = formData.get("date")?.toString();
    const type = formData.get("type")?.toString();
    const daytime = formData.get("daytime")?.toString();
    const cause = formData.get("cause")?.toString();
    const meds: boolean = formData.get("meds") === "true" ? true : false;
    const user = cookies().get("user")?.value;

    if (date === "" || type === "" || daytime === "" || cause === "" || meds === undefined)
        return { message: "Some inputs are empty", variant: "error" }

    if (!user || user === "")
        return { message: "User is missing. Try refreshing page", variant: "error" }

    const { id } = JSON.parse(user);

    try {
        const found = await prisma.records.findFirst({
            where: {
                user_id: id,
                date: new Date(date as string),
                day_part: daytime
            }
        });

        if (found)
            return { message: "Record already exists", variant: "error" };

        const record = await prisma.records.create({
            data: {
                user_id: id,
                date: new Date(date as string),
                type: type as string,
                cause: cause as string,
                day_part: daytime as string,
                meds: meds
            }
        });

        return { message: "Records added", variant: "success", record }
    } catch (error) {
        return { message: "Something went wrong", variant: "error" }
    }
}

export const getRecords = async (week: string[]): Promise<number | RecordsProps[]> => {
    if (week.length <= 0)
        return 500;

    const user = cookies().get("user")?.value;

    if (!user)
        return 500;

    const { id } = JSON.parse(user);

    try {
        const data = await prisma.records.findMany({
            where: {
                user_id: id,
                date: {
                    in: week.map(day => new Date(day))
                }
            },
        });

        return data;
    } catch (error) {
        return 500;
    }
}

export const getFilters = async (): Promise<string[] | number> => {
    try {
        const data = await prisma.records.groupBy({
            by: "cause"
        });

        const filters: string[] = data.map(item => item.cause);

        return filters;
    } catch (error) {
        return 500;
    }
}

const getDates = (date: string): string[] => {
    let start = moment(date).startOf("week").subtract(1, "d").startOf("week");
    let days: string[] = [];

    for (let i = 0; i < 7; i++) {
        days.push(start.format("YYYY-MM-DD"));
        start.add(1, "days");
    }

    return days;
};

export const getPrev = async (date: string): Promise<PrevProps | number> => {
    const user = cookies().get("user")?.value;

    if (!date || date === "" || !user)
        return 400;

    const { id } = JSON.parse(user);

    try {
        const week = getDates(date);

        const count = await prisma.records.count({
            where: {
                user_id: id,
                date: {
                    in: week.map(day => new Date(day))
                },
            }
        })

        const migraineCount = await prisma.records.count({
            where: {
                user_id: id,
                date: {
                    in: week.map(day => new Date(day))
                },
                type: "Migraine"
            }
        })

        return { freq: count, migraines: migraineCount };
    } catch (error) {
        return 500;
    }
}

export const RemoveRecord = async (id: number): Promise<number> => {
    if (!id)
        return 400;
    try {
        await prisma.records.delete({
            where: {
                id
            }
        })

        return 200;
    } catch (error) {
        console.log(error);
        return 500;
    }
}

export const monthlyCount = async (): Promise<number[] | number> => {
    const user = cookies().get("user");

    if (!user || !user.value)
        return 304;

    const { id } = JSON.parse(user.value);

    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    const monthLength = [];

    for (let i = 1; i < currentMonth + 1; i++) {
        monthLength.push(i);
    }

    try {
        const records: RecordsProps[] = await prisma.$queryRaw`SELECT * FROM records WHERE YEAR(date) = ${currentYear} AND user_id = ${id}`;

        if (!records)
            return 403;

        const data = monthLength.map(month => records.filter(({ date }) => moment(date).month() + 1 === month).length)

        return data;
    } catch (error) {
        return 500;
    }
}

export const csvRecords = async (): Promise<FormatProps[] | number> => {
    const user = cookies().get("user");

    if (!user || !user.value)
        return 304;

    const { id } = JSON.parse(user.value);

    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    const monthLength: number[] = [];

    for (let i = currentMonth; i >= currentMonth - 3 + 1; i--) {
        monthLength.push(i);
    }

    try {
        const records: RecordsProps[] = await prisma.$queryRaw`SELECT date, type, cause, meds, day_part FROM records WHERE YEAR(date) = ${currentYear} AND user_id = ${id} ORDER BY date DESC`;

        if (!records)
            return 403;

        const data = records.filter(({ date }) => monthLength.find(month => month === moment(date).month()));

        const format = data.reduce((array: FormatProps[], { date, type, cause, day_part, meds }) => {
            const row = { date: moment(date).format("YYYY-MM-DD"), type, cause, time: day_part, meds: meds ? "YES" : "NO" };

            array.push(row);

            return array;
        }, []);

        return format;
    } catch (error) {
        return 500;
    }
}