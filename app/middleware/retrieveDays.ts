import moment from "moment";

export const retrieveDays = (date: string | Date, option: string): string[] => {
    let start = moment(date).startOf(option as moment.unitOfTime.StartOf);
    let days: string[] = [];

    let length;

    switch (option) {
        case "week":
            length = 7;
            break;

        case "month":
            length = moment(date).daysInMonth();
            break;

        case "year":
            length = moment(date).isLeapYear() ? 366 : 365;;
            break;

        default:
            length = 7;
            break;
    }

    for (let i = 0; i < length; i++) {
        days.push(start.format("YYYY-MM-DD"));
        start.add(1, "days");
    }

    return days;
};