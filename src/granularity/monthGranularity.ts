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

export class MonthGranularity extends GranularityBase {
    constructor(calendar: Calendar, locale: string, dateFormatSettings:dateFormatSettings) {
        super(calendar, locale, Utils.GET_GRANULARITY_PROPS_BY_MARKER("Month"), dateFormatSettings);
    }

    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        if (!props.granularSettings.granularityMonthVisibility) {
            return null;
        }

        return super.render(props, isFirst);
    }

    public getType(): GranularityType {
        return GranularityType.month;
    }

    public splitDate(date: Date): (string | number)[] {
        return [
            this.getMonthName(date),
            this.calendar.determineYear(date),
        ];
    }

    public sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean {
        return this.getMonthName(firstDatePeriod.startDate) === this.getMonthName(secondDatePeriod.startDate)
            && this.calendar.determineYear(firstDatePeriod.startDate) === this.calendar.determineYear(secondDatePeriod.startDate);
    }

    public generateLabel(datePeriod: ITimelineDatePeriod): ITimelineLabel {
        // const quarter: string = this.getQuarterName(datePeriod.startDate);
        const monthName: string = this.getMonthName(datePeriod.startDate);
        const yearName: string = this.getYearName(datePeriod.startDate);

        const text: string = `${monthName} ${yearName}`;
        const title: string = `${monthName} ${yearName}`;

        return {
            id: datePeriod.index,
            text, 
            title
        };
    }
}
