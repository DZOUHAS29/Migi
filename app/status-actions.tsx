"use server"
import moment from "moment";
import { Notification, Output } from "./interfaces"
import { cookies } from "next/headers";
import { getCollection } from '@/lib/mongo';
import { ObjectId } from 'mongodb';
import { getUser } from "./actions";

export const checkHealth = async (): Promise<Output> => {
    try {
        const recordsColl = await getCollection("records");

        if (!recordsColl) return { variant: "error", message: "records collection not found" };

        const data = await recordsColl.countDocuments({
            date: {
                $gte: moment().startOf("month").toDate(),
                $lt: moment().endOf("month").toDate()
            }
        });

        if (data <= 2)
            return { variant: "success", message: "ok" };

        const notification = await addNotification("Hey! you're health is getting concerning!");

        if (typeof notification === "number")
            return { variant: "success", message: "bad" };

        return { variant: "success", message: "bad", notification };
    } catch (error) {
        return { variant: "error", message: "Error: Something went wrong" };
    }
}

export const addNotification = async (message: string): Promise<Notification | number> => {
    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const notifColl = await getCollection("notifications");

        if (!notifColl) return 404;

        const todayStart = moment().startOf("day").toDate();
        const todayEnd = moment().endOf("day").toDate();

        const exist = await notifColl.findOne({
            user: user.id,
            date: { $gte: todayStart, $lt: todayEnd }
        });

        if (exist)
            return 200;

        const insert = await notifColl.insertOne({
            user: user.id,
            message: message,
            date: moment().toDate(),
            createdAt: new Date(),
        });

        const notification = await notifColl.findOne({ _id: new ObjectId(insert.insertedId) });

        return { id: notification?._id.toString(), ...notification } as unknown as Notification;
    } catch (error) {
        return 500;
    }
}

export const getNotifications = async (): Promise<Notification[] | number> => {
    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const notifColl = await getCollection("notifications");

        if (!notifColl) return 404;

        const data = (await notifColl.find({ user: user.id }).toArray()).map(n => ({ id: n?._id.toString(), ...n }));

        return data as unknown as Notification[];
    } catch (error) {
        return 500;
    }
}

export const removeNotification = async (id: number | string): Promise<number | string> => {
    try {
        const user = (await getUser()).user;

        if (!user)
            return 403;

        const notifColl = await getCollection("notifications");

        if (!notifColl) return 404;

        const notification = await notifColl.findOne({ user: user.id });

        if (!notification || notification.user !== user.id)
            return 403;

        await notifColl.deleteOne({ _id: new ObjectId(id as string) });

        return id;
    } catch (error) {
        return 500;
    }
}