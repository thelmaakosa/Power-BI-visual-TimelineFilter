import { CalendarSettings } from "../settings/calendarSettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";
import { Calendar } from "./calendar";
import { WeekStandards } from "./weekStandards";
import { CalendarISO8061 } from "./calendarISO8061";

export class CalendarFactory {
    public create(
        calendaTypeSettings: calendaTypeSettings,
        calendarSettings: CalendarSettings,
        ) : Calendar {

        let calendar: Calendar = null;

        switch (calendaTypeSettings.weekStandard) {
            case WeekStandards.ISO8061:
                calendar = new CalendarISO8061();
                break;
            default:
                calendar = new Calendar(calendarSettings)
        }

        return calendar;
    }
}