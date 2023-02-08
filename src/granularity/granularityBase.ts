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

import {
    selectAll,
    Selection,
} from "d3-selection";

import { valueFormatter } from "powerbi-visuals-utils-formattingutils";
import { manipulation as svgManipulation } from "powerbi-visuals-utils-svgutils";
import { pixelConverter } from "powerbi-visuals-utils-typeutils";

import { Calendar } from "../calendars/calendar";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { GranularitySettings } from "../settings/granularitySettings";
import { Utils } from "../utils";
import { IGranularity } from "./granularity";
import { IGranularityName } from "./granularityName";
import { IGranularityRenderProps } from "./granularityRenderProps";
import powerbiVisualsApi from "powerbi-visuals-api";
import { dateFormatSettings } from "../settings/dateFormatSettings";

import {
    IExtendedLabel,
    ITimelineLabel,
} from "../dataInterfaces";
import { left, right } from "powerbi-visuals-utils-chartutils/lib/legend/legendPosition";
import { window } from "d3";
import { GeneralSettings } from "../settings/generalSettings";
import { CalendarSettings } from "../settings/calendarSettings";

export class GranularityBase implements IGranularity {

    private static DefaultFraction: number = 1;

    protected calendar: Calendar;

    private clickableRectHeight: number = 40;
    private clickableRectFactor: number = 2;
    private clickableRectWidth: number = 50;

    private hLineYOffset: number = 10;
    private hLineWidth: number = 45;
    private hLineXOffset: number = 45;
    private vLineHeight: number = 5;

    private sliderXOffset: number = 25;
    private sliderYOffset: number = 13;
    private sliderRx: number = 4;
    private sliderWidth: number = 45;
    private sliderHeight: number = 17;

    private textLabelYOffset: number = 0;

    private datePeriods: ITimelineDatePeriod[] = [];
    private extendedLabel: IExtendedLabel;
    private shortDayFormatter: valueFormatter.IValueFormatter;
    private shortDayOfWeekFormatter: valueFormatter.IValueFormatter;
    private shortMonthFormatter: valueFormatter.IValueFormatter;
    private shortYearFormatter: valueFormatter.IValueFormatter;


    private granularityProps: IGranularityName = null;
    

    private DefaultQuarter: number = 3;

    constructor(calendar: Calendar, private locale: string, granularityProps: IGranularityName, dateFormatSettings: dateFormatSettings, CalendarSettings: CalendarSettings) {
        this.calendar = calendar;
        this.shortDayFormatter = valueFormatter.create({ format: 'dd', cultureSelector: this.locale });
        this.shortDayOfWeekFormatter = valueFormatter.create({ format: dateFormatSettings.dayofweekFormat, cultureSelector: this.locale });
        this.shortMonthFormatter = valueFormatter.create({ format: dateFormatSettings.monthFormat, cultureSelector: this.locale });
        this.shortYearFormatter = valueFormatter.create({ format: dateFormatSettings.yearFormat, cultureSelector: this.locale });
        this.granularityProps = granularityProps;
    }

    public measures(){



    }
    
    
    
    
    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        
        const granularitySelection = props.selection
            .append("g")
            .attr("transform", svgManipulation.translate(0, 0));

            

        // render vetical line
        granularitySelection.append("rect")
            .classed("timelineVertLine", true)
            .attr("x", 0)
            .attr("y", 8)
            .attr("width", props.granularSettings.scaleThickness)
            .attr("height", pixelConverter.toString(this.vLineHeight + props.granularSettings.scaleThickness))
            .attr("fill", props.granularSettings.scale? props.granularSettings.scaleColor : "rgba(255, 255, 255, 0)");

        // render horizontal line
        if (!isFirst) {
            granularitySelection.append("rect")
                .classed("timelineHorzLine", true)
                .attr("x", pixelConverter.toString(0 - this.hLineXOffset*props.granularSettings.fontSize/8))
                .attr("y", pixelConverter.toString(this.hLineYOffset))
                .attr("height", props.granularSettings.scaleThickness)
                .attr("width", pixelConverter.toString(this.hLineWidth*props.granularSettings.fontSize/8))
                .attr("fill", props.granularSettings.scale? props.granularSettings.scaleColor : "rgba(255, 255, 255, 0)");
        }

        // render marker
        granularitySelection.append("text")
            .classed("periodSlicerGranularities", true)
            .text(this.granularityProps.marker)
            .attr("x", pixelConverter.toString(0))
            .attr("y", pixelConverter.toString(0 + this.textLabelYOffset))
            .style("font-size", pixelConverter.fromPointToPixel(props.granularSettings.fontSize))
            .style("font-family", props.granularSettings.fontFamily)
            .style("font-weight", props.granularSettings.Bold ? '900' : 'normal')
            .style("font-style", props.granularSettings.Italic ? 'italic' : 'initial')
            .style("text-decoration", props.granularSettings.Underline ? 'underline' : 'initial')
            .style("fill", props.granularSettings.fontColor)

        // render slider
        if (props.granularSettings.granularity === this.granularityProps.granularityType) {
            this.renderSlider(
                granularitySelection,
                props.granularSettings
            );
        }

        granularitySelection
            .append("rect")
            .classed("periodSlicerSelectionRect", true)
            .attr("x", pixelConverter.toString(0 - this.clickableRectWidth / this.clickableRectFactor))
            .attr("y", pixelConverter.toString(0 - this.clickableRectWidth / this.clickableRectFactor))
            .attr("width", pixelConverter.toString(this.clickableRectWidth))
            .attr("height", pixelConverter.toString(this.clickableRectHeight))
            .on("click", null)
            .on("click", () => {
                const event: MouseEvent = <MouseEvent>(require("d3").event);

                event.stopPropagation();

                props.selectPeriodCallback(this.granularityProps.granularityType);

                const sliderSelection = selectAll("rect.periodSlicerRect");

                if (sliderSelection) {
                    sliderSelection.remove();
                }

                this.renderSlider(
                    granularitySelection,
                    props.granularSettings,
                );
            });

        granularitySelection.attr("fill", props.granularSettings.scaleColor);

        return granularitySelection;
    }

    public splitDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[] {
        return [
            this.getMonthName(date),
            date.getDate(),
            this.calendar.determineYear(date),
        ];
    }

    public splitDateForTitle(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): (string | number)[] {
        return this.splitDate(date, dateFormatSettings, calendarSettings);
    }

    public getDayName(date: Date): string {
        return this.shortDayFormatter.format(date);
    }
    public getDayofWeekName(date: Date): string {
        return this.shortDayOfWeekFormatter.format(date);
    }
    public getMonthName(date: Date): string {
        // const currentdate:  Date = new Date(
        //     this.calendar.determineYear(date),
        //     this.calendar.determineMonth(date),
        //     date.getDay(),
        // );

        return this.shortMonthFormatter.format(date); 
    }
    public getYearName(date: Date): string {
        return this.shortYearFormatter.format(date);
    }

    public resetDatePeriods(): void {
        this.datePeriods = [];
    }

    public getDatePeriods(): ITimelineDatePeriod[] {
        return this.datePeriods;
    }

    public getExtendedLabel(): IExtendedLabel {
        return this.extendedLabel;
    }

    public setExtendedLabel(extendedLabel: IExtendedLabel): void {
        this.extendedLabel = extendedLabel;
    }

    public createLabels(granularity: IGranularity, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): ITimelineLabel[] {
        const labels: ITimelineLabel[] = [];
        let lastDatePeriod: ITimelineDatePeriod;
        this.datePeriods.forEach((datePeriod: ITimelineDatePeriod) => {
            if (!labels.length || !granularity.sameLabel(datePeriod, lastDatePeriod, dateFormatSettings, calendarSettings)) {
                lastDatePeriod = datePeriod;
                labels.push(granularity.generateLabel(datePeriod, dateFormatSettings, this.calendar, calendarSettings));
            }
        });

        return labels;
    }

    /**
     * Adds the new date into the given datePeriods array
     * If the date corresponds to the last date period, given the current granularity,
     * it will be added to that date period. Otherwise, a new date period will be added to the array.
     * i.e. using Month granularity, Feb 2 2015 corresponds to Feb 3 2015.
     * It is assumed that the given date does not correspond to previous date periods, other than the last date period
     */
    public addDate(date: Date, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): void {
        const datePeriods: ITimelineDatePeriod[] = this.getDatePeriods();
        const lastDatePeriod: ITimelineDatePeriod = datePeriods[datePeriods.length - 1];
        const identifierArray: (string | number)[] = this.splitDate(date, dateFormatSettings, calendarSettings);

        if (datePeriods.length === 0
            || !Utils.IS_ARRAYS_EQUAL(lastDatePeriod.identifierArray, identifierArray)) {

            if (datePeriods.length > 0) {
                lastDatePeriod.endDate = date;
            }

            datePeriods.push({
                endDate: date,
                fraction: GranularityBase.DefaultFraction,
                identifierArray,
                index: datePeriods.length,
                startDate: date,
                week: this.calendar.determineWeek(date),
                year: this.calendar.determineYear(date),
                month: this.calendar.determineMonth(date),
            });
        }
        else {
            lastDatePeriod.endDate = date;
        }
    }

    public setNewEndDate(date: Date): void {
        this.datePeriods[this.datePeriods.length - 1].endDate = date;
    }

    /**
     * Splits a given period into two periods.
     * The new period is added after the index of the old one, while the old one is simply updated.
     * @param index The index of the date priod to be split
     * @param newFraction The fraction value of the new date period
     * @param newDate The date in which the date period is split
     */
    public splitPeriod(index: number, newFraction: number, newDate: Date): void {
        const oldDatePeriod: ITimelineDatePeriod = this.datePeriods[index];

        oldDatePeriod.fraction -= newFraction;

        const newDateObject: ITimelineDatePeriod = {
            endDate: oldDatePeriod.endDate,
            fraction: newFraction,
            identifierArray: oldDatePeriod.identifierArray,
            index: oldDatePeriod.index + oldDatePeriod.fraction,
            startDate: newDate,
            week: this.calendar.determineWeek(newDate),
            year: this.calendar.determineYear(newDate),
            month: this.calendar.determineMonth(newDate),
        };

        oldDatePeriod.endDate = newDate;

        this.datePeriods.splice(index + 1, 0, newDateObject);
    }

    /**
     * Returns the date's quarter name (e.g. Q1, Q2, Q3, Q4)
     * @param date A date
     */
    protected getQuarterName(date: Date, dateFormatSettings: dateFormatSettings): string {
        let quarter: number = this.DefaultQuarter;
        let year: number = this.calendar.determineYear(date);
        var yearstring: string;

        while (date < this.calendar.getQuarterStartDate(year, quarter)) {
            if (quarter > 0) {
                quarter--;
            }
            else {
                quarter = this.DefaultQuarter;
                year--;
            }
        }

        quarter++;

        if (this.calendar.getFirstMonthOfYear() == 0 && this.calendar.getFirstDayOfYear() == 1){
            year--;
        }

        yearstring = dateFormatSettings.yearFormat == "yy" ? "'"+((year + 1) % 100).toString() : (year + 1).toString()

        if (dateFormatSettings.quarterFormat == "Quarter X"){
            return `Quarter ${quarter} ${yearstring}`;
        }
        else if(dateFormatSettings.quarterFormat == "QX"){
            return `Q${quarter} ${yearstring}`;
        }
        
    }

    protected getNextQuarter(date: Date, dateFormatSettings: dateFormatSettings): string {
        let quarter: number = this.DefaultQuarter;
        let year: number = this.calendar.determineYear(date);
        var yearstring: string;

        while (date < this.calendar.getQuarterStartDate(year, quarter)) {
            if (quarter > 0) {
                quarter--;
            }
            else {
                quarter = this.DefaultQuarter;
                year--;
            }
        }

        if (this.calendar.getFirstMonthOfYear() == 0 && this.calendar.getFirstDayOfYear() == 1){
            year--;
        }

        quarter = quarter + 2;

        year = quarter==5? year+1: year
        quarter = quarter==5? 1: quarter;

        yearstring = dateFormatSettings.yearFormat == "yy" ? "'"+(year % 100).toString() : (year).toString()

        if (dateFormatSettings.quarterFormat == "Quarter X"){
            return `Quarter ${quarter} ${yearstring}`;
        }
        else if(dateFormatSettings.quarterFormat == "QX"){
            return `Q${quarter} ${yearstring}`;
        }
        
    }

    private renderSlider(
        selection: Selection<any, any, any, any>,
        granularSettings: GranularitySettings,
    ): void {
            const isSelectedOutlineThickness = granularSettings.selectedOutlineLeft || granularSettings.selectedOutlineRight || granularSettings.selectedOutlineTop || granularSettings.selectedOutlineBottom
            const selectedOutlineThickness = isSelectedOutlineThickness ? granularSettings.selectedOutlineThickness : 0
            // selection
            // .append("rect")
            // .classed("periodSlicerRect", true)
            // .attr("x", pixelConverter.toString(0 - this.sliderWidth*granularSettings.fontSize/16))
            // .attr("y", pixelConverter.toString(0 - this.sliderYOffset - granularSettings.fontSize/4))
            // .attr("rx", pixelConverter.toString(granularSettings.selectedOutlineRadius))
            // .attr("ry", pixelConverter.toString(granularSettings.selectedOutlineRadius))
            // .attr("width", pixelConverter.toString(this.sliderWidth*granularSettings.fontSize/8))
            // .attr("height", pixelConverter.toString(this.sliderHeight + granularSettings.fontSize/4))
            // .style("fill", granularSettings.selectedfillColor)
            // .style("fill-opacity", granularSettings.transparency/100)
            // .style("stroke", granularSettings.outlineColor)
            // .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
            // .data([granularSettings.granularity])

            const width = this.sliderWidth*granularSettings.fontSize/8;
            const height = this.sliderHeight + granularSettings.fontSize/4;
            const rx = (granularSettings.selectedOutlineRadius);
            
            const x = (0 - width/2 + rx);
            const y = (0 - this.sliderYOffset - granularSettings.fontSize/4);

            // selection
            // .append("path")
            // .style("fill", granularSettings.selectedfillColor)
            // .style("fill-opacity", granularSettings.transparency/100)
            // .style("stroke", granularSettings.outlineColor)
            // .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
            // .data([granularSettings.granularity])
            // .attr("d", "M" + x + "," + y + " h" + (width-2*rx) + " a" + rx + "," + rx + " 0 0 1 " + rx + "," + rx + " v" + (height-2*rx) + " a" + rx + "," + rx + " 0 0 1 -" + rx + "," + rx +  " h-" + (width-2*rx) + " a" + rx + "," + rx + " 0 0 1 -" + rx + ",-" + rx + " v-" + (height-2*rx) + " a" + rx + "," + rx + " 0 0 1 " + rx + ",-" + rx + " z")
        
            if (granularSettings.selectedOutlineTop == true){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + x + "," + y + " h" + (width-2*rx) + " z")
            }
            if (granularSettings.selectedOutlineRight == true){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + (width/2) + "," + (y+rx) + " v" + (height-2*rx) + " z")
            
            }
            if (granularSettings.selectedOutlineBottom == true){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + x + "," + (y+height) + " h" + (width-2*rx) + " z")
            
            }
            if (granularSettings.selectedOutlineLeft == true){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + (-width/2) + "," + (y+rx) + " v" + (height-2*rx) + " z")
            
            }
            if (granularSettings.selectedOutlineLeft ==true && granularSettings.selectedOutlineTop == true ){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + (-width/2) + "," + (y+rx) + " a" + rx + "," + rx + " 0 0 1 " + rx + "," + (-rx))
                

            }
            if (granularSettings.selectedOutlineLeft ==true && granularSettings.selectedOutlineBottom == true ){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + x + "," + (y+height) + " a" + rx + "," + rx + " 0 0 1 " + (-rx) + "," + (-rx))
                
            }
            if (granularSettings.selectedOutlineRight ==true && granularSettings.selectedOutlineTop == true ){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + (width/2-rx) + "," + y + " a" + rx + "," + rx + " 0 0 1 " + rx + "," + rx)
            }
            if (granularSettings.selectedOutlineRight ==true && granularSettings.selectedOutlineBottom == true ){
                selection
                .append("path")
                .style("fill", granularSettings.selectedfillColor)
                .style("fill-opacity", granularSettings.transparency/100)
                .style("stroke", granularSettings.outlineColor)
                .style("stroke-width", pixelConverter.toString(selectedOutlineThickness))
                .data([granularSettings.granularity])
                .attr("d", "M" + (width/2) + "," + (y+height-rx) + " a" + rx + "," + rx + " 0 0 1 " + (-rx) + "," + rx)
                
            }

            
    }
}
