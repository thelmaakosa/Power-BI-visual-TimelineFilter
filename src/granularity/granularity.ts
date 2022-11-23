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
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import powerbiVisualsApi from "powerbi-visuals-api";

import {
    IExtendedLabel,
    ITimelineLabel,
} from "../dataInterfaces";
import { dateFormatSettings } from "../settings/dateFormatSettings";
import { CalendarSettings } from "../settings/calendarSettings";

export interface IGranularity {
    getType?(): GranularityType;
    splitDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[];
    getDatePeriods(): ITimelineDatePeriod[];
    resetDatePeriods(): void;
    getExtendedLabel(): IExtendedLabel;
    setExtendedLabel(extendedLabel: IExtendedLabel): void;
    createLabels(granularity: IGranularity, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): ITimelineLabel[];
    sameLabel?(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): boolean;
    generateLabel?(datePeriod: ITimelineDatePeriod, dateFormatSettings: dateFormatSettings, calendar: Calendar, calendarSettings: CalendarSettings): ITimelineLabel;
    addDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings);
    setNewEndDate(date: Date): void;
    splitPeriod(index: number, newFraction: number, newDate: Date): void;
    splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[];
    render(
        props: IGranularityRenderProps,
        isFirst: boolean,
    ): Selection<any, any, any, any>;
}
