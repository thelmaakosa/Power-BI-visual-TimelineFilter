import { ITimelineDatePeriodBase } from "./datePeriod";
export declare class DatePeriodBase implements ITimelineDatePeriodBase {
    static PARSE(jsonString: string): DatePeriodBase;
    static CREATE(startDate: Date, endDate: Date): DatePeriodBase;
    static CREATEEMPTY(): DatePeriodBase;
    startDate: Date;
    endDate: Date;
    constructor(startDate: Date, endDate: Date);
    toString(): string;
}
