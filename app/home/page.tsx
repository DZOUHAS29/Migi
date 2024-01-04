import { Divider } from "@chakra-ui/react";
import { Calendar } from "./components/page-components/Calendar";
import Graphs from "./components/page-components/Graphs";
import { RecentRecords } from "./components/page-components/RecentRecords";

export default function Page() {

    return (
        <div className="grid grid-cols-12">
            <div className="lg:col-span-7 md:col-span-12 sm:col-span-12 xs-full lg:pl-9 md:pl-5 md:pr-5 sm:pl-3 sm:pr-3 xs-padding">
                <Calendar />
            </div>
            <div className="col-span-1">
                
            </div>
            <div className="lg:col-span-4 md:col-span-12 sm:col-span-12 xs-full md:p-5 sm:p-3 xs-padding">
                <div className="flex flex-col gap-y-5">
                    <div>
                        <Graphs />
                    </div>
                    <div>
                        <RecentRecords />
                    </div>
                </div>
            </div>
        </div>
    )
}