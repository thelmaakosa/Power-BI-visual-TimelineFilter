import { Selection } from "d3-selection";
import { Calendar } from "../calendars/calendar";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { IExtendedLabel, ITimelineLabel } from "../dataInterfaces";
import { dateFormatSettings } from "../settings/dateFormatSettings";
import { CalendarSettings } from "../settings/calendarSettings";
export interface IGranularity {
    getType?(): GranularityType;
    splitDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[];
    getDatePeriods(): ITimelineDatePeriod[];
    resetDatePeriods(): void;
    getExtendedLabel(): IExtendedLabel;
    setExtendedLabel(extendedLabel: IExtendedLabel): void;
    createLabels(granularity: IGranularity, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): ITimelineLabel[];
    sameLabel?(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): boolean;
    generateLabel?(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendar: Calendar, calendarSettings: CalendarSettings): ITimelineLabel;
    addDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): any;
    setNewEndDate(date: Date): void;
    splitPeriod(index: number, newFraction: number, newDate: Date): void;
    splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[];
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
}
