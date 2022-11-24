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

import { timeDay } from "d3";
import { Selection } from "d3-selection";
import powerbiVisualsApi from "powerbi-visuals-api";

import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { Utils } from "../utils";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { dateFormatSettings } from "../settings/dateFormatSettings"; 
import { CalendarSettings } from "../settings/calendarSettings";
import { calendaTypeSettings } from "../settings/calendaTypeSettings";

export class WeekGranularity extends GranularityBase {
    private localizationKey: string = "Visual_Granularity_Year";

    constructor(
        calendar: Calendar,
        locale: string,
        protected localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager,
        dateFormatSettings: dateFormatSettings,
        CalendarSettings: CalendarSettings
    ) {
        super(calendar, locale, Utils.GET_GRANULARITY_PROPS_BY_MARKER("Week"), dateFormatSettings, CalendarSettings);
    }

    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        if (!props.granularSettings.granularityWeekVisibility) {
            return null;
        }

        return super.render(props, isFirst);
    }

    public getType(): GranularityType {
        return GranularityType.week;
    }

    public splitDate(date: Date): (string | number)[] {
        return this.calendar.determineWeek(date);
    }

    public splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[] {
        const weekData = this.calendar.determineWeek(date);


        var currentdate: Date = date;
        var currentdateday = currentdate.getDay();
        
        currentdate.setDate(currentdate.getDate() );

        var month = this.getMonthName(currentdate)
        var day = currentdate.getDate()
        var year: string = ''
        if (dateFormatSettings.yearFormat == "yy"){
            year = "'" + this.getYearName(currentdate);
        }
        else if (dateFormatSettings.yearFormat != "yy"){
            year = this.getYearName(currentdate);
        }

        currentdate.setDate(currentdate.getDate() )


        return [
            month,
            day,
            year
        ];
    }

    public sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean {
        return Utils.IS_ARRAYS_EQUAL(firstDatePeriod.week, secondDatePeriod.week);
    }

    public generateLabel(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendar: Calendar, calendarSettings: CalendarSettings): ITimelineLabel {
        const localizedWeek = this.localizationManager
            ? this.localizationManager.getDisplayName(this.localizationKey)
            : this.localizationKey;

        // const quarter: string = this.getQuarterName(datePeriod.startDate);
        // var dayName: Number;
        // var monthName: string;
        // var yearName: string
        // var nextdayName: Number;
        // var nextmonthName: string = '';
        // var nextyearName: string = '';
        // var text: string;
        // var nexttext: string = ''

        // var currentdate: Date = datePeriod.startDate;
        // var currentdateday = currentdate.getDay();

        // currentdate.setDate(currentdate.getDate() - currentdateday + calendarSettings.firstdayofweek);
        
        // var nextdate: Date = calendar.getNextWeek(currentdate);

        // var dayofweek: string
        // if (dateFormatSettings.dayofweek == true){
        //     dayofweek = this.getDayofWeekName(datePeriod.startDate);
        // }
        // else{
        //     dayofweek = "";
        // }

        // dayName = currentdate.getDate();
        // monthName = this.getMonthName(currentdate);
        // nextdayName = nextdate.getDate();
        // nextmonthName = this.getMonthName(nextdate);
        // if (dateFormatSettings.yearFormat == "yy"){
        //     yearName = "'" + this.getYearName(currentdate);
        //     nextyearName = "'" + this.getYearName(nextdate);

        // }
        // else if (dateFormatSettings.yearFormat != "yy"){
        //     yearName = this.getYearName(currentdate);
        //     nextyearName = this.getYearName(nextdate);

        // }

        // currentdate.setDate(currentdate.getDate()+currentdateday - calendarSettings.firstdayofweek);

        // if (dateFormatSettings.datecategorization == true ){
        //     text = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
        //     nexttext = `\n - ${dayofweek} ${nextmonthName} ${nextdayName} ${nextyearName}`;
        // }
        // else{
        //     text = `${dayofweek} ${monthName} ${dayName} ${yearName}`;
        // }

        // return {
        //     id: datePeriod.index,
        //     text: text + nexttext,
        //     title: text + nexttext,
        // };
        var currentdate: Date = datePeriod.startDate;
        var nextdate: Date = datePeriod.endDate;

        var currentdateday = currentdate.getDay();

        currentdate.setDate(currentdate.getDate() + calendarSettings.firstdayofweek - currentdateday);

        var day: Number = currentdate.getDate();
        var nextday: Number = nextdate.getDate();

        var dayofweek = dateFormatSettings.dayofweek == true ? this.getDayofWeekName(currentdate) : "";
        var nextdayofweek = dateFormatSettings.dayofweek == true ? this.getDayofWeekName(nextdate) : "";

        var monthName: string = this.getMonthName(currentdate);
        var nextmonthName: string = this.getMonthName(nextdate);
        
        var yearName = dateFormatSettings.yearFormat == "yy" ? "'"+(this.calendar.determineYear(currentdate) % 100).toString() : (this.calendar.determineYear(currentdate)).toString()
        var nextyearname = dateFormatSettings.yearFormat == "yy" ? "'"+(this.calendar.determineYear(nextdate) % 100).toString() : (this.calendar.determineYear(nextdate)).toString()

        currentdate.setDate(currentdate.getDate() - calendarSettings.firstdayofweek + currentdateday);

        return {
            id: datePeriod.index,
            text: dateFormatSettings.datecategorization ? `${dayofweek} ${monthName} ${day} ${yearName} - ${nextdayofweek} ${nextmonthName} ${nextday} ${nextyearname}` :  `${dayofweek} ${monthName} ${day} ${yearName}`,
            title: dateFormatSettings.datecategorization ? `${dayofweek} ${monthName} ${day} ${yearName} - ${nextdayofweek} ${nextmonthName} ${nextday} ${nextyearname}` : `${dayofweek} ${monthName} ${day} ${yearName}`,
        };
    }
}
