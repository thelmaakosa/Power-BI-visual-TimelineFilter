import { CalendarSettings } from "../settings/calendarSettings";
import { WeekDaySettings } from "../settings/weekDaySettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";
import { Calendar } from "./calendar";
export declare class CalendarFactory {
    create(calendaTypeSettings: calendaTypeSettings, calendarSettings: CalendarSettings, weekDaySettings: WeekDaySettings): Calendar;
}
