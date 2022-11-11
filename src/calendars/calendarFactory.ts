import { CalendarSettings } from "../settings/calendarSettings";
import { WeekDaySettings } from "../settings/weekDaySettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";
import { Calendar } from "./calendar";
import { WeekStandards } from "./weekStandards";
import { CalendarISO8061 } from "./calendarISO8061";

export class CalendarFactory {
    public create(
        calendaTypeSettings: calendaTypeSettings,
        calendarSettings: CalendarSettings,
        weekDaySettings: WeekDaySettings) : Calendar {

        let calendar: Calendar = null;

        switch (calendaTypeSettings.weekStandard) {
            case WeekStandards.ISO8061:
                calendar = new CalendarISO8061();
                break;
            default:
                calendar = new Calendar(calendarSettings, weekDaySettings)
        }

        return calendar;
    }
}