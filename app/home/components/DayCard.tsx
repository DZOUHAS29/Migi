import { Card, CardBody, CardFooter, CardHeader, Heading, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import { FiSunrise } from "@react-icons/all-files/fi/FiSunrise";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiSunset } from "@react-icons/all-files/fi/FiSunset";

interface props {
    day: string;
}

const style = {
    current: "bg-blue-400 border-none hover:bg-blue-500 hover:cursor-pointer",
    normal: "bg-blue-300 hover:cursor-pointer hover:bg-blue-400"
}

export const DayCard: React.FC<props> = ({ day }) => {
    return (
        <Card
            className={day === moment().format("YYYY-MM-DD") ? style.current : style.normal}
            variant={"filled"}
        >
            <CardHeader>
                <Heading className="font-mono text-lg">
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
                <Text className="font-bold">
                    {moment(day).format("DD.M.")}
                </Text>
            </CardFooter>
        </Card>
    )
}