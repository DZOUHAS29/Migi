import { Calendar } from "./components/page-components/Calendar";
import Graphs from "./components/page-components/Graphs";
import { RecentRecords } from "./components/page-components/RecentRecords";

export default function Page() {

    return (
        <div className="grid grid-cols-12">
            <div className="grid col-span-7 pl-9">
                <Calendar />
            </div>
            <div className="grid col-span-1">

            </div>
            <div className="grid col-span-4 pr-9">
                <div className="flex flex-col gap-y-6">
                    <div className="grid">
                        <Graphs />
                    </div>
                    <div className="grid">
                        <RecentRecords />
                    </div>
                </div>
            </div>
        </div>
    )
}