import { Selection } from "d3-selection";
import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
export declare class MonthGranularity extends GranularityBase {
    constructor(calendar: Calendar, locale: string);
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
    getType(): GranularityType;
    splitDate(date: Date): (string | number)[];
    sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean;
    generateLabel(datePeriod: ITimelineDatePeriod): ITimelineLabel;
}
