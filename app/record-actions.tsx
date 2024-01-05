"use server"
import { cookies } from 'next/headers';
import { RecordsProps } from './interfaces';
import prisma from '@/prisma-client';
import moment from 'moment';

interface Output {
    message: string;
    variant: string;
    record?: RecordsProps
}

interface PrevProps {
    freq: number;
    migraines: number;
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