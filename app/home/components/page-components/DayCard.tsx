import { Card, CardBody, CardFooter, CardHeader, Heading, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import { FiSunrise } from "@react-icons/all-files/fi/FiSunrise";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiSunset } from "@react-icons/all-files/fi/FiSunset";
import { useAddData } from "@/app/contexts/add-data";

interface props {
    day: string;
}

const style = {
    current: "bg-blue-300 border-none rounded-none hover:cursor-pointer border-b border-b-slate-900 border-t-blue-200 border-l-blue-200 border-r-blue-200 rounded-none",
    normal: "bg-blue-200 hover:cursor-pointer border-b border-b-slate-900 border-t-blue-200 border-l-blue-200 border-r-blue-200 rounded-none"
}

export const DayCard: React.FC<props> = ({ day }) => {
    const { openAdd } = useAddData();

    const handle = () => {
        openAdd(day);
    }

    return (
        <Card
            className={day === moment().format("YYYY-MM-DD") ? style.current : style.normal}
            variant={"outline"}
            onClick={handle}
        >
            <CardHeader>
                <Heading className="text-lg font-normal">
                    {moment(day).format("ddd")}
                </Heading>
            </CardHeader>
            <CardBody className="p-0 pl-5 pr-5">
                {/* Records */}
            </CardBody>
            <CardFooter>
                <Text className="">
                    {moment(day).format("DD.M.")}
                </Text>
            </CardFooter>
        </Card>
    )
}