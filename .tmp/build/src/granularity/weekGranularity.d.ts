import { Selection } from "d3-selection";
import powerbiVisualsApi from "powerbi-visuals-api";
import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
export declare class WeekGranularity extends GranularityBase {
    protected localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager;
    private localizationKey;
    constructor(calendar: Calendar, locale: string, localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager);
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
    getType(): GranularityType;
    splitDate(date: Date): (string | number)[];
    splitDateForTitle(date: Date): (string | number)[];
    sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean;
    generateLabel(datePeriod: ITimelineDatePeriod): ITimelineLabel;
}
