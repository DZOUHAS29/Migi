import { useRecordInfo } from "@/app/contexts/record-info";
import { RecordsProps } from "@/app/interfaces";
import { ScaleFade } from "@chakra-ui/react";
import { CgPill } from "@react-icons/all-files/cg/CgPill";

const RecordCard = (data: RecordsProps) => {
    const { type, meds, cause } = data;
    const { openAdd } = useRecordInfo();

    return (
        <ScaleFade in={true} initialScale={0.9}>
            <div className="grid grid-cols-2 justify-items-center p-2 rounded bg-tea-green text-ucla-blue  hover:bg-celadon hover:bg-opacity-80"
                onClick={() => { openAdd(data) }}
            >
                <div className="col-span-2 font-medium">
                    {type}
                </div>
                <div className="col-span-2">
                    <span className="text-sm">{cause}</span>
                </div>
                <div className="col-span-2 text-lg pt-1">
                    {meds ? <CgPill /> : null}
                </div>
            </div>
        </ScaleFade>
    )
}

export default RecordCard