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
import { YearGranularity } from "./yearGranularity";
import powerbiVisualsApi from "powerbi-visuals-api";
import { dateFormatSettings } from "../settings/dateFormatSettings";

export class QuarterGranularity extends GranularityBase {
    constructor(calendar: Calendar, locale: string, dateFormatSettings: dateFormatSettings) {
        super(calendar, locale, Utils.GET_GRANULARITY_PROPS_BY_MARKER("Quarter"), dateFormatSettings);
    }

    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        if (!props.granularSettings.granularityQuarterVisibility) {
            return null;
        }

        return super.render(props, isFirst);
    }

    public getType(): GranularityType {
        return GranularityType.quarter;
    }

    public splitDate(date: Date, dateFormatSettings: dateFormatSettings): (string | number)[] {
        var quarter = this.getQuarterName(date, dateFormatSettings)
        var year: string = ''
        if (dateFormatSettings.yearFormat == "yy"){
            year = "'" + this.getYearName(date);
        }
        else if (dateFormatSettings.yearFormat != "yy"){
            year = this.getYearName(date);
        }
        
        return [
            quarter,
            year,
        ];
    }

    public sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): boolean {
        return this.getQuarterName(firstDatePeriod.startDate, dateFormatSettings) === this.getQuarterName(secondDatePeriod.startDate, dateFormatSettings)
            && firstDatePeriod.year === secondDatePeriod.year;
    }

    public generateLabel(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings): ITimelineLabel {
        const quarter: string = this.getQuarterName(datePeriod.startDate, dateFormatSettings);
        var yearName: string = ''
        if (dateFormatSettings.yearFormat == "yy"){
            yearName = "'" + this.getYearName(datePeriod.startDate);
        }
        else if (dateFormatSettings.yearFormat != "yy"){
            yearName = this.getYearName(datePeriod.startDate);
        }

        return {
            id: datePeriod.index,
            text: `${quarter} ${yearName}`,
            title: `${quarter} ${yearName}`,
        };
    }
}
