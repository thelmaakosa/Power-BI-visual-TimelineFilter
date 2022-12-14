import { CalendarSettings } from "../settings/calendarSettings";
import { WeekDaySettings } from "../settings/weekDaySettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";
interface IDateDictionary {
    [year: number]: Date;
}
export interface IPeriodDates {
    startDate: Date;
    endDate: Date;
}
export declare class Calendar {
    private static QuarterFirstMonths;
    protected firstDayOfWeek: number;
    protected firstMonthOfYear: number;
    protected firstDayOfYear: number;
    protected dateOfFirstWeek: IDateDictionary;
    protected dateOfFirstFullWeek: IDateDictionary;
    protected quarterFirstMonths: number[];
    protected isDaySelection: boolean;
    protected EmptyYearOffset: number;
    protected YearOffset: number;
    constructor(calendarFormat: CalendarSettings, weekDaySettings: WeekDaySettings);
    getFiscalYearAjustment(): number;
    determineYear(date: Date): number;
    determineMonth(date: Date): number;
    determineWeek(date: Date): number[];
    getFirstDayOfWeek(): number;
    getFirstMonthOfYear(): number;
    getFirstDayOfYear(): number;
    getNextDate(date: Date): Date;
    getLastDatePeriod(num: number, date: Date): IPeriodDates;
    getNextWeek(date: Date): Date;
    getNextMonth(date: Date): Date;
    getNextYear(date: Date): Date;
    getWeekPeriod(date: Date): IPeriodDates;
    getLastWeekPeriod(num: number, date: Date): IPeriodDates;
    getQuarterIndex(date: Date): number;
    getQuarterStartDate(year: number, quarterIndex: number): Date;
    getQuarterEndDate(date: Date): Date;
    getQuarterPeriod(date: Date): IPeriodDates;
    getMonthPeriod(date: Date): IPeriodDates;
    getLastMonthPeriod(num: number, date: Date): IPeriodDates;
    getYearPeriod(date: Date): IPeriodDates;
    getLastYearPeriod(num: number, date: Date): IPeriodDates;
    isChanged(calendarSettings: CalendarSettings, calendaTypeSettings: calendaTypeSettings): boolean;
    getDateOfFirstWeek(year: number): Date;
    getDateOfFirstFullWeek(year: number): Date;
    private calculateDateOfFirstFullWeek;
}
export {};
