import { Calendar } from "./components/page-components/Calendar";
import Graphs from "./components/page-components/Graphs";
import { RecentRecords } from "./components/page-components/RecentRecords";

export default function Page() {

    return (
        <div className="flex">
            <div className="grid w-2/3">
                <Calendar />
            </div>
            <div className="grid w-1/3">
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