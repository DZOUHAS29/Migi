import { Divider, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { FiSunrise } from "@react-icons/all-files/fi/FiSunrise";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiSunset } from "@react-icons/all-files/fi/FiSunset";
import { CgPill } from "@react-icons/all-files/cg/CgPill";
import React, { ReactNode, useState } from "react";

interface props {
    date: Date;
    dayPart: string;
    type: string;
    cause: string;
    meds: boolean;
}

export const RecentCard = ({ date, dayPart, cause, meds, type }: props) => {
    const dayIcon = (): ReactNode => {
        if (!dayPart)
            return <></>;

        if (dayPart === "Morning")
            return <FiSunrise />;
        if (dayPart === "Afternoon")
            return <FiSun />;
        if (dayPart === "Evening")
            return <FiSunset />;
    }

    return (
        <div>
            <Tooltip label={cause} hasArrow bg={"rgba(0, 0, 0, 0.9)"} className="rounded">
                <div className="flex flex-col">
                    <div className="grid grid-cols-12 pt-3">
                        <div className="col-span-2">
                            {moment(date).format("MM/DD")}
                        </div>
                        <div className="col-span-4 text-center">
                            {type}
                        </div>
                        <div className="col-span-4 text-xl self-center justify-self-center">
                            {dayIcon()}
                        </div>
                        <div className="col-span-1 text-xl self-center justify-self-end text-white">
                            {meds ? <CgPill /> : null}
                        </div>
                    </div>
                    <div className="pt-3">
                        <Divider className="border-white" />
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
