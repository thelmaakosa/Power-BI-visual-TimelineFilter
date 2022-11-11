import { Selection } from "d3-selection";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { IExtendedLabel, ITimelineLabel } from "../dataInterfaces";
import { dateFormatSettings } from "../settings/dateFormatSettings";
export interface IGranularity {
    getType?(): GranularityType;
    splitDate(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[];
    getDatePeriods(): ITimelineDatePeriod[];
    resetDatePeriods(): void;
    getExtendedLabel(): IExtendedLabel;
    setExtendedLabel(extendedLabel: IExtendedLabel): void;
    createLabels(granularity: IGranularity, dateFormatSettings: dateFormatSettings): ITimelineLabel[];
    sameLabel?(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): boolean;
    generateLabel?(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): ITimelineLabel;
    addDate(date: Date, dateFormatSettings: dateFormatSettings): any;
    setNewEndDate(date: Date): void;
    splitPeriod(index: number, newFraction: number, newDate: Date): void;
    splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[];
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
}
