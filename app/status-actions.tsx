"use server"

import moment from "moment";
import { Notification, Output } from "./interfaces"
import prisma from "@/prisma-client";
import { cookies } from "next/headers";

export const checkHealth = async (): Promise<Output> => {
    try {
        const data = await prisma.records.count({
            where: {
                date: {
                    gte: moment().startOf("month").toDate(),
                    lt: moment().endOf("month").toDate()
                }
            }
        })

        if (data < 10)
            return { variant: "success", message: "ok" };

        const notification = await addNotification("Hey! you're health is getting concerning!");

        if (typeof notification === "number")
            return { variant: "success", message: "bad" };


        return { variant: "success", message: "bad", notification };
    } catch (error) {
        return { variant: "error", message: "health check bug" };
    }
}

export const addNotification = async (message: string): Promise<Notification | number> => {
    const user = cookies().get("user")?.value;

    if (!user)
        return 304;

    const parse = JSON.parse(user);

    try {
        const notification = await prisma.notifications.create({
            data: {
                user_id: parse.id,
                message: message,
                date: moment().toDate()
            }
        });

        return notification;
    } catch (error) {
        return 500;
    }
}

export const getNotifications = async (): Promise<Notification[] | number> => {
    const user = cookies().get("user")?.value;

    if (!user)
        return 304;

    const parse = JSON.parse(user);

    try {
        const data = await prisma.notifications.findMany({
            where: {
                user_id: parse.id
            }
        });

        return data;
    } catch (error) {
        return 500;
    }
}