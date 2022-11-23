import { Selection } from "d3-selection";
import powerbiVisualsApi from "powerbi-visuals-api";
import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { dateFormatSettings } from "../settings/dateFormatSettings";
import { CalendarSettings } from "../settings/calendarSettings";
export declare class WeekGranularity extends GranularityBase {
    protected localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager;
    private localizationKey;
    constructor(calendar: Calendar, locale: string, localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager, dateFormatSettings: dateFormatSettings, CalendarSettings: CalendarSettings);
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
    getType(): GranularityType;
    splitDate(date: Date): (string | number)[];
    splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[];
    sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean;
    generateLabel(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendar: Calendar, calendarSettings: CalendarSettings): ITimelineLabel;
}
