import moment from "moment";
import { RecordsProps, StatsProps } from "../interfaces";

export const retrieveStats = (array: RecordsProps[], dates: string[]): void | StatsProps[] => {
    if (array.length <= 0)
        return;

    const stats: StatsProps[] = array.reduce((summary: StatsProps[], { date, type, day_part, meds }: RecordsProps) => {
        const exists = summary.find(item => item.date === moment(date).format("YYYY-MM-DD"));
        const info = exists || { date: moment(date).format("YYYY-MM-DD"), overall: 0, headaches: 0, migraines: 0, meds: 0, part: { morning: 0, afternoon: 0, evening: 0 } };

        info.overall += 1;

        info.part[day_part.toLocaleLowerCase()] += 1;

        if (type === "Migraine")
            info.migraines += 1;
        else
            info.headaches += 1;

        if (meds)
            info.meds += 1;

        if (!exists)
            summary.push(info as StatsProps);

        return summary;
    }, []);

    dates.map(date => {
        if (stats.find(item => item.date === date))
            return;

        stats.push({ date, overall: 0, headaches: 0, migraines: 0, meds: 0, part: { morning: 0, afternoon: 0, evening: 0 } });
    });

    const sorted: StatsProps[] = stats.sort((a: StatsProps, b: StatsProps) => {
        return moment(a.date).get('date') - moment(b.date).get('date')
    });

    return sorted;
}