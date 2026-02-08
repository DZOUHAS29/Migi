"use server"
import { Output, RecordsProps } from './interfaces';
import moment from 'moment';
import { getCollection } from '@/lib/mongo';
import { getUser } from './actions';
import { ObjectId } from 'mongodb';

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

    if (date === "" || type === "" || daytime === "" || cause === "" || meds === undefined)
        return { message: "Some inputs are empty", variant: "error" }

    try {
        const user = (await getUser()).user;

        if (!user)
            return { message: "user not found", variant: "error" }

        const recordsColl = await getCollection("records");

        if (!recordsColl)
            return { message: "collection not found", variant: "error" }

        const found = await recordsColl.findOne({
            user: user.id,
            date: new Date(date as string),
            day_part: daytime
        });

        if (found)
            return { message: "record already exists", variant: "error" };

        const insert = await recordsColl.insertOne({
            user: user.id,
            date: new Date(date as string),
            type: type as string,
            cause: cause as string,
            day_part: daytime as string,
            meds: meds,
            createdAt: new Date(),
        });

        const record = await recordsColl.findOne({ _id: new ObjectId(insert.insertedId) });

        return { message: "records added", variant: "success", record: { id: record?._id.toString(), ...record } as unknown as RecordsProps }
    } catch (error) {
        return { message: "something went wrong", variant: "error" }
    }
}

export const getRecords = async (week: string[]): Promise<number | RecordsProps[]> => {
    if (week.length <= 0)
        return 500;

    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const raw = await recordsColl.find({
            user: user.id,
            date: { $in: week.map(day => new Date(day)) }
        }).toArray();

        const data = raw.map(doc => ({
            ...doc,
            id: doc._id?.toString()
        }));

        return data as unknown as RecordsProps[];
    } catch (error) {
        return 500;
    }
}

export const getFilters = async (): Promise<string[] | number> => {
    try {
        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const filters = await recordsColl.distinct("cause");

        return filters as string[];
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
    if (!date || date === "")
        return 400;

    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const week = getDates(date);

        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const count = await recordsColl.countDocuments({
            user: user.id,
            date: { $in: week.map(day => new Date(day)) }
        });

        const migraineCount = await recordsColl.countDocuments({
            user: user.id,
            date: { $in: week.map(day => new Date(day)) },
            type: "Migraine"
        });

        return { freq: count, migraines: migraineCount };
    } catch (error) {
        return 500;
    }
}

export const RemoveRecord = async (id: string | number): Promise<string | number> => {
    if (!id)
        return 400;

    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const record = await recordsColl.findOne({ _id: new ObjectId(id as string) });

        if (!record || record.user !== user.id)
            return 403;

        await recordsColl.deleteOne({ _id: new ObjectId(id as string) });

        return id;
    } catch (error) {
        console.log(error);
        return 500;
    }
}

export const monthlyCount = async (): Promise<number[] | number> => {
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    const monthLength = [];

    for (let i = 1; i < currentMonth + 1; i++) {
        monthLength.push(i);
    }

    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const start = moment().year(currentYear).startOf("year").toDate();
        const end = moment().year(currentYear).endOf("year").toDate();

        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const records = await recordsColl.find({ user: user.id, date: { $gte: start, $lte: end } }).toArray();

        if (!records)
            return 404;

        const data = monthLength.map(month => records.filter(({ date }) => moment(date).month() + 1 === month).length);

        return data;
    } catch (error) {
        return 500;
    }
}

export const csvRecords = async (): Promise<FormatProps[] | number> => {
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    const monthLength: number[] = [];

    for (let i = currentMonth; i >= currentMonth - 3 + 1; i--) {
        monthLength.push(i);
    }

    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const start = moment().year(currentYear).startOf("year").toDate();
        const end = moment().year(currentYear).endOf("year").toDate();

        const recordsColl = await getCollection("records");

        if (!recordsColl) return 404;

        const records = await recordsColl.find({ user: user.id, date: { $gte: start, $lte: end } }, { projection: { date: 1, type: 1, cause: 1, meds: 1, day_part: 1 } }).sort({ date: -1 }).toArray();

        if (!records)
            return 404;

        const data = records.filter(({ date }) => monthLength.find(month => month === moment(date).month()));

        const format = data.reduce((array: FormatProps[], { date, type, cause, day_part, meds }) => {
            const row = { date: moment(date).format("YYYY-MM-DD"), type, cause, time: day_part, meds: meds ? "YES" : "NO" };

            array.push(row);

            return array;
        }, [] as FormatProps[]);

        return format;
    } catch (error) {
        return 500;
    }
}