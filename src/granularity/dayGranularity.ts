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

import { Selection } from "d3-selection";

import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { Utils } from "../utils";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import powerbiVisualsApi from "powerbi-visuals-api";
import { dateFormatSettings } from "../settings/dateFormatSettings";

export class DayGranularity extends GranularityBase {
    constructor(calendar: Calendar, locale: string, dateFormatSettings:dateFormatSettings) {
        super(calendar, locale, Utils.GET_GRANULARITY_PROPS_BY_MARKER("Day"), dateFormatSettings);
    }

    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        if (!props.granularSettings.granularityDayVisibility) {
            return null;
        }

        return super.render(props, isFirst);
    }

    public getType(): GranularityType {
        return GranularityType.day;
    }

    public splitDate(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[] {
        var month = this.getMonthName(date)
        var day = date.getDate()
        var year: string = ''
        if (dateFormatSettings.yearFormat == "yy"){
            year = "'" + this.getYearName(date);
        }
        else if (dateFormatSettings.yearFormat != "yy"){
            year = this.getYearName(date);
        }

        return [
            month,
            day,
            year,
        ];
    }

    public sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean {
        return firstDatePeriod.startDate.getTime() === secondDatePeriod.startDate.getTime();
    }

    public generateLabel(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): ITimelineLabel {
        // const quarter: string = this.getQuarterName(datePeriod.startDate);
        var dayofweek: string;
        var nextdayofweek: string;
        var text:string;
        var title: string;
        if (dateFormatSettings.dayofweek == true){
            dayofweek = this.getDayofWeekName(datePeriod.startDate);
            // nextdayofweek = this.getDayofWeekName(calendar.getNextDate(datePeriod.startDate));
        }
        else{
            dayofweek = "";
        }
        
        const monthName: string = this.getMonthName(datePeriod.startDate);
        const dayName: string = this.getDayName(datePeriod.startDate);
        var yearName: string = ''
        if (dateFormatSettings.yearFormat == "yy"){
            yearName = "'" + this.getYearName(datePeriod.startDate);
        }
        else if (dateFormatSettings.yearFormat != "yy"){
            yearName = this.getYearName(datePeriod.startDate);
        }
        
        if (dateFormatSettings.datecategorization == true ){
            text = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
            title = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
        }
        else{
            text = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
            title = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
        }

        return {
            id: datePeriod.index,
            text,
            title,
        };
    }
}
