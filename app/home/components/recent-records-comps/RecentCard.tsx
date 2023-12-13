
interface props {
    date: Date;
    day_part: string;
    type: string;
    cause: string;
    meds: boolean;
}

export const RecentCard = ({ date, day_part, cause, meds, type }: props) => {
    return (
        <div>RecentCard</div>
    )
}
