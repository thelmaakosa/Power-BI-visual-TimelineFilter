import { Selection } from "d3-selection";
import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { dateFormatSettings } from "../settings/dateFormatSettings";
export declare class QuarterGranularity extends GranularityBase {
    constructor(calendar: Calendar, locale: string, dateFormatSettings: dateFormatSettings);
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
    getType(): GranularityType;
    splitDate(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[];
    sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): boolean;
    generateLabel(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): ITimelineLabel;
}
