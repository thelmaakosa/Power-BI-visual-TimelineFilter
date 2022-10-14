import { CalendarSettings } from "../settings/calendarSettings";
import { WeekDaySettings } from "../settings/weekDaySettings";
import { WeeksDetermintaionStandardsSettings } from "../settings/weeksDetermintaionStandardsSettings";
import { Calendar } from "./calendar";
export declare class CalendarFactory {
    create(weeksDetermintaionStandardsSettings: WeeksDetermintaionStandardsSettings, calendarSettings: CalendarSettings, weekDaySettings: WeekDaySettings): Calendar;
}
