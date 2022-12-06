/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import powerbiVisualsApi from "powerbi-visuals-api";
import { manipulation as svgManipulation } from "powerbi-visuals-utils-svgutils";

import { DayGranularity } from "./dayGranularity";
import { IGranularity } from "./granularity";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { MonthGranularity } from "./monthGranularity";
import { QuarterGranularity } from "./quarterGranularity";
import { WeekGranularity } from "./weekGranularity";
import { YearGranularity } from "./yearGranularity";

import { Calendar } from "../calendars/calendar";
import { Utils } from "../utils";
import { GranularitySettings } from "../settings/granularitySettings";
import { dateFormatSettings } from "../settings/dateFormatSettings";
import { CalendarSettings } from "../settings/calendarSettings";

export class GranularityData {
    /**
     * Returns the date of the previos day
     * @param date The following date
     */
    public static PREVIOUS_DAY(date: Date): Date {
        const prevDay: Date = Utils.RESET_TIME(date);

        prevDay.setDate(prevDay.getDate() - GranularityData.DayOffset);

        return prevDay;
    }

    /**
     * Returns the date of the next day
     * @param date The previous date
     */
    public static NEXT_DAY(date: Date): Date {
        const nextDay: Date = Utils.RESET_TIME(date);

        nextDay.setDate(nextDay.getDate() + GranularityData.DayOffset);

        return nextDay;
    }
    public static NEXT_WEEK(date: Date): Date {
        const nextWeek: Date = Utils.RESET_TIME(date);

        nextWeek.setDate(nextWeek.getDate() + 7);

        return nextWeek;
    }
    
    public static NEXT_MONTH(date: Date): Date {
        const nextMonth: Date = Utils.RESET_TIME(date);

        nextMonth.setMonth(nextMonth.getMonth() + GranularityData.MonthOffset);

        return nextMonth;
    }
    public static NEXT_YEAR(date: Date): Date {
        const nextYear: Date = Utils.RESET_TIME(date);

        nextYear.setFullYear(nextYear.getFullYear() + GranularityData.YearOffset);

        return nextYear;
    }

    private static DayOffset: number = 1;
    private static MonthOffset: number = 1;
    private static YearOffset: number = 1;

    private dates: Date[];
    private granularities: IGranularity[];
    private endingDate: Date;
    private groupXOffset: number = 10;
    private groupWidth: number = 45;

    constructor(startDate: Date, endDate: Date) {
        this.granularities = [];
        this.setDatesRange(startDate, endDate);

        const lastDate: Date = this.dates[this.dates.length - 1];

        this.endingDate = GranularityData.NEXT_DAY(lastDate);
    }

    /**
     * Adds a new granularity to the array of granularities.
     * Resets the new granularity, adds all dates to it, and then edits the last date period with the ending date.
     * @param granularity The new granularity to be added
     */
    public addGranularity(granularity: IGranularity, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): void {
        granularity.resetDatePeriods();

        for (const date of this.dates) {
            granularity.addDate(date, dateFormatSettings, calendarSettings);
        }

        granularity.setNewEndDate(this.endingDate);

        this.granularities.push(granularity);
    }

    /**
     * Renders all available granularities
     */
    public renderGranularities(viewport: powerbiVisualsApi.IViewport, props: IGranularityRenderProps): void {
        let renderIndex = 0;

        let count = 0

        if (props.granularSettings.granularityYearVisibility) {count = count + 1};
        if (props.granularSettings.granularityQuarterVisibility ) {count = count + 1}; 
        if (props.granularSettings.granularityMonthVisibility) {count = count + 1};
        if (props.granularSettings.granularityWeekVisibility) {count = count +1};
        if (props.granularSettings.granularityDayVisibility) { count = count + 1};

        this.granularities.forEach((granularity: IGranularity) => {
            const granularitySelection = granularity.render(props, renderIndex === 0);
            if (props.granularSettings.position == 'right'){
                if (granularitySelection !== null) {
                    granularitySelection.attr(
                        "transform",
                        svgManipulation.translate(viewport.width - (this.groupWidth*(count)*props.granularSettings.fontSize/8) + renderIndex * this.groupWidth * props.granularSettings.fontSize/8, 0),
                    );
    
                    renderIndex++;
                }
            }
            else if (props.granularSettings.position == 'left'){
                if (granularitySelection !== null) {
                    granularitySelection.attr(
                        "transform",
                        svgManipulation.translate(renderIndex * this.groupWidth * props.granularSettings.fontSize/8, 0),
                    );
    
                    renderIndex++;
                }
            }
            else{
                if (granularitySelection !== null) {
                    granularitySelection.attr(
                        "transform",
                        svgManipulation.translate(viewport.width / 2 - (this.groupWidth*(count)*props.granularSettings.fontSize) / 16 + renderIndex * this.groupWidth * props.granularSettings.fontSize/8, 0),
                    );
    
                    renderIndex++;
                }
            }
            
        });
    }

    /**
     * Returns a specific granularity from the array of granularities
     * @param index The index of the requested granularity
     */
    public getGranularity(index: number): IGranularity {
        return this.granularities[index];
    }

    public createGranularities(
        calendar: Calendar,
        locale: string,
        localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager,
        dateFormatSettings: dateFormatSettings,
        calendarSettings: CalendarSettings
    ): void {
        this.granularities = [];

        this.addGranularity(new YearGranularity(calendar, locale, localizationManager, dateFormatSettings, calendarSettings), dateFormatSettings, calendarSettings);
        this.addGranularity(new QuarterGranularity(calendar, locale, dateFormatSettings, calendarSettings), dateFormatSettings, calendarSettings);
        this.addGranularity(new MonthGranularity(calendar, locale, dateFormatSettings, calendarSettings), dateFormatSettings, calendarSettings);
        this.addGranularity(new WeekGranularity(calendar, locale, localizationManager, dateFormatSettings, calendarSettings), dateFormatSettings, calendarSettings);
        this.addGranularity(new DayGranularity(calendar, locale, dateFormatSettings, calendarSettings), dateFormatSettings, calendarSettings);
    }

    public createLabels(dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): void {
        this.granularities.forEach((granularity: IGranularity) => {
            granularity.setExtendedLabel({
                dayLabels: granularity.getType() >= GranularityType.day
                    ? granularity.createLabels(this.granularities[GranularityType.day], dateFormatSettings, calendarSettings)
                    : [],
                monthLabels: granularity.getType() >= GranularityType.month
                    ? granularity.createLabels(this.granularities[GranularityType.month], dateFormatSettings, calendarSettings)
                    : [],
                quarterLabels: granularity.getType() >= GranularityType.quarter
                    ? granularity.createLabels(this.granularities[GranularityType.quarter], dateFormatSettings, calendarSettings)
                    : [],
                weekLabels: granularity.getType() >= GranularityType.week
                    ? granularity.createLabels(this.granularities[GranularityType.week], dateFormatSettings, calendarSettings)
                    : [],
                yearLabels: granularity.getType() >= GranularityType.year
                    ? granularity.createLabels(this.granularities[GranularityType.year], dateFormatSettings, calendarSettings)
                    : [],
            });
        });
    }

    /**
     * Returns an array of dates with all the days between the start date and the end date
     */
    private setDatesRange(startDate: Date, endDate: Date): void {
        let date: Date = startDate;

        this.dates = [];

        while (date <= endDate) {
            this.dates.push(date);
            date = GranularityData.NEXT_DAY(date);
        }
    }
}
