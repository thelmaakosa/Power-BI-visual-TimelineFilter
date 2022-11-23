import { Selection } from "d3-selection";
import { Calendar } from "../calendars/calendar";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { IGranularity } from "./granularity";
import { IGranularityName } from "./granularityName";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { dateFormatSettings } from "../settings/dateFormatSettings";
import { IExtendedLabel, ITimelineLabel } from "../dataInterfaces";
import { CalendarSettings } from "../settings/calendarSettings";
export declare class GranularityBase implements IGranularity {
    private locale;
    private static DefaultFraction;
    protected calendar: Calendar;
    private clickableRectHeight;
    private clickableRectFactor;
    private clickableRectWidth;
    private granularityXOffset;
    private hLineYOffset;
    private hLineWidth;
    private hLineXOffset;
    private vLineHeight;
    private sliderXOffset;
    private sliderYOffset;
    private sliderRx;
    private sliderWidth;
    private sliderHeight;
    private textLabelYOffset;
    private textLabelDx;
    private datePeriods;
    private extendedLabel;
    private shortDayFormatter;
    private shortDayOfWeekFormatter;
    private shortMonthFormatter;
    private shortYearFormatter;
    private granularityProps;
    private DefaultQuarter;
    constructor(calendar: Calendar, locale: string, granularityProps: IGranularityName, dateFormatSettings: dateFormatSettings, CalendarSettings: CalendarSettings);
    measures(): void;
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
    splitDate(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[];
    splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[];
    getDayName(date: Date): string;
    getDayofWeekName(date: Date): string;
    getMonthName(date: Date): string;
    getYearName(date: Date): string;
    resetDatePeriods(): void;
    getDatePeriods(): ITimelineDatePeriod[];
    getExtendedLabel(): IExtendedLabel;
    setExtendedLabel(extendedLabel: IExtendedLabel): void;
    createLabels(granularity: IGranularity, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): ITimelineLabel[];
    /**
     * Adds the new date into the given datePeriods array
     * If the date corresponds to the last date period, given the current granularity,
     * it will be added to that date period. Otherwise, a new date period will be added to the array.
     * i.e. using Month granularity, Feb 2 2015 corresponds to Feb 3 2015.
     * It is assumed that the given date does not correspond to previous date periods, other than the last date period
     */
    addDate(date: Date, dateFormatSettings: dateFormatSettings): void;
    setNewEndDate(date: Date): void;
    /**
     * Splits a given period into two periods.
     * The new period is added after the index of the old one, while the old one is simply updated.
     * @param index The index of the date priod to be split
     * @param newFraction The fraction value of the new date period
     * @param newDate The date in which the date period is split
     */
    splitPeriod(index: number, newFraction: number, newDate: Date): void;
    /**
     * Returns the date's quarter name (e.g. Q1, Q2, Q3, Q4)
     * @param date A date
     */
    protected getQuarterName(date: Date, dateFormatSettings: dateFormatSettings): string;
    protected getNextQuarter(date: Date, dateFormatSettings: dateFormatSettings): string;
    private renderSlider;
}
