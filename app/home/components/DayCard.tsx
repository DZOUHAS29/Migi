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
    current: "bg-blue-400 border-none hover:bg-blue-500 hover:cursor-pointer",
    normal: "bg-blue-300 hover:cursor-pointer hover:bg-blue-400"
}

export const DayCard: React.FC<props> = ({ day }) => {
    const { openAdd } = useAddData();

    const handle = () => {
        openAdd(day);
    }

    return (
        <Card
            className={day === moment().format("YYYY-MM-DD") ? style.current : style.normal}
            variant={"filled"}
            onClick={handle}
        >
            <CardHeader>
                <Heading className="text-lg font-normal">
                    {moment(day).format("ddd")}
                </Heading>
            </CardHeader>
            <CardBody className="p-0 pl-5 pr-5">
                <div className="flex justify-between">
                    <div className="grid">
                        <Icon as={FiSunrise} className="text-2xl" />
                    </div>
                    <div className="grid">
                        <Icon as={FiSun} className="text-2xl" />
                    </div>
                    <div className="grid">
                        <Icon as={FiSunset} className="text-2xl" />
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <Text className="">
                    {moment(day).format("DD.M.")}
                </Text>
            </CardFooter>
        </Card>
    )
}