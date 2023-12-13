import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers";
import { RecentCard } from "../recent-records-comps/RecentCard";

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

    const getRecords = async (): Promise<RecordsProps[] | string> => {
        "use server"
        const prisma: PrismaClient = new PrismaClient();

        const user = cookies().get("user")?.value;

        if (!user)
            return "No records found";

        const { id } = JSON.parse(user);

        try {
            const records = prisma.records.findMany({
                where: {
                    user_id: id
                },
                orderBy: {
                    id: "desc"
                },
                take: 5
            });

            return records;
        } catch (error) {
            return "No records found";
        }
    }

    const records = await getRecords();

    return (
        <div className="flex flex-col">
            {
                
            }
        </div>
    )
}