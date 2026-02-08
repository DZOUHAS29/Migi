import { cookies } from "next/headers";
import { RecentCard } from "../recent-records-comps/RecentCard";
import { Divider } from "@chakra-ui/react";
import { getCollection } from '@/lib/mongo';
import { ObjectId } from 'mongodb';
import { getUser } from "@/app/actions";

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

        try {
            const user = (await getUser()).user;

            if (!user)
                return null;

            const recordsColl = await getCollection('records');

            if (!recordsColl) return null;

            const records = await recordsColl.find({ user: user.id }).sort({ createdAt: -1 }).limit(6).toArray();

            return records as unknown as RecordsProps[];
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