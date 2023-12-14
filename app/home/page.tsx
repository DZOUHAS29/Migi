import { Calendar } from "./components/page-components/Calendar";
import Graphs from "./components/page-components/Graphs";
import { RecentRecords } from "./components/page-components/RecentRecords";

export default function Page() {

    return (
        <div className="grid grid-cols-12">
            <div className="grid col-span-7">
                <Calendar />
            </div>
            <div className="grid col-span-1">

            </div>
            <div className="grid col-span-3">
                <div className="flex flex-col">
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