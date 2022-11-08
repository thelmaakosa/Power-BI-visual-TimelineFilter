import { Calendar } from "./calendar";
import { CalendarSettings } from "../settings/calendarSettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";
export declare class CalendarISO8061 extends Calendar {
    constructor();
    determineWeek(date: Date): number[];
    private determineWeekYear;
    getDateOfFirstWeek(year: number): Date;
    getDateOfFirstFullWeek(year: number): Date;
    isChanged(calendarSettings: CalendarSettings, calendaTypeSettings: calendaTypeSettings): boolean;
}
