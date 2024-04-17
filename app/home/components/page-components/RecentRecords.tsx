import { cookies } from "next/headers";
import { RecentCard } from "../recent-records-comps/RecentCard";
import prisma from "@/prisma-client";
import { Divider } from "@chakra-ui/react";

interface RecordsProps {
    id: number;
    user_id: number;
    date: Date;
    day_part: string;
    type: string;
    cause: string;
    meds: boolean;
}

export const RecentRecords = async () => {

    const getRecords = async (): Promise<RecordsProps[] | null> => {
        "use server"

        const user = cookies().get("user")?.value;

        if (!user)
            return null;

        const { id } = JSON.parse(user);

        try {
            const records = await prisma.records.findMany({
                where: {
                    user_id: id
                },
                orderBy: {
                    id: "desc"
                },
                take: 6
            });

            return records;
        } catch (error) {
            return null;
        }
    }

    const records = await getRecords();

    return (
        <div className="flex flex-col bg-air-blue p-2 rounded text-white">
            <div className="pl-2">
                <span className="font-medium">
                    Recent records
                </span>
            </div>
            {/* <div>
                <Divider className="border-ucla-blue" />
            </div> */}
            {
                records?.map(({ date, cause, day_part, meds, type }, i) => <RecentCard key={i} date={date} cause={cause} dayPart={day_part} meds={meds} type={type} />)
            }
        </div>
    )
}