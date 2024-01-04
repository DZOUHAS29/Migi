import { Card, Divider } from "@chakra-ui/react";
import moment from "moment";
import { useAddData } from "@/app/contexts/add-data";
import { RecordsProps } from "@/app/interfaces";
import RecordCard from "../day-card-comps/RecordCard";

interface props {
    day: string;
    records: RecordsProps[]
}

const style = {
    current: "bg-air-blue",
    normal: "bg-ucla-blue"
}

export const DayCard: React.FC<props> = ({ day, records }: props) => {
    const { openAdd } = useAddData();

    const handle = () => {
        openAdd(day);
    }

    return (
        <Card
            className={`${day === moment().format("YYYY-MM-DD") ? style.current : style.normal} 
              hover:cursor-pointer border-b-0 rounded-none text-white border-l-0 border-t-0 border-r-0
            `}
            variant={"outline"}
        >
            <div className="grid grid-cols-7">
                <div className="col-span-1 text-lg" onClick={handle}>
                    <div className="flex flex-col p-6">
                        <div className="grid pb-1">
                            {moment(day).format("ddd")}

                        </div>
                        <div className="grid">
                            {moment(day).format("MM/DD")}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 justify-self-center self-center w-2/3">
                    {(() => {
                        const morningRecord = records?.find((record) => record.day_part === "Morning");

                        if (!morningRecord)
                            return null;

                        const { cause, date, day_part, meds, type } = morningRecord;

                        return <RecordCard date={date} type={type} meds={meds} cause={cause} day_part={day_part} key={"morning " + date} />
                    })()}
                </div>
                <div className="col-span-2 justify-self-center self-center w-2/3">
                    {(() => {
                        const afternoonRecord = records?.find((record) => record.day_part === "Afternoon");

                        if (!afternoonRecord)
                            return null;

                        const { cause, date, day_part, meds, type } = afternoonRecord;

                        return <RecordCard date={date} type={type} meds={meds} cause={cause} day_part={day_part} key={"afternoon " + date} />
                    })()}
                </div>
                <div className="col-span-2 justify-self-center self-center w-2/3">
                    {(() => {
                        const eveningRecord = records?.find((record) => record.day_part === "Evening");

                        if (!eveningRecord)
                            return null;

                        const { cause, date, day_part, meds, type } = eveningRecord;

                        return <RecordCard date={date} type={type} meds={meds} cause={cause} day_part={day_part} key={"evening " + date} />
                    })()}
                </div>
            </div>
            <Divider />
        </Card>
    )
}