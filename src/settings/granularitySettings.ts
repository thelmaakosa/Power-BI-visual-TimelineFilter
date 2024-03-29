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

import { GranularityType } from "../granularity/granularityType";

export class GranularitySettings {
    public show: boolean = true;
    public granularityYearVisibility: boolean = true;
    public granularityQuarterVisibility: boolean = true;
    public granularityMonthVisibility: boolean = true;
    public granularityWeekVisibility: boolean = true;
    public granularityDayVisibility: boolean = true;
    public granularity: GranularityType = GranularityType.month;
    public position: string = "left";
    public fontFamily: string = 'Segoe UI';
    public fontSize: number = 9;
    public fontColor: string = "#00458F";
    public Bold: boolean = false;
    public Italic: boolean = false;
    public Underline: boolean = false;
    public selectedfillColor: string = "transparent";
    public transparency: number = 50;
    public selectedOutlineRadius: number = 0;
    public selectedOutlineLeft: boolean = true;
    public selectedOutlineRight: boolean = true;
    public selectedOutlineTop: boolean = true;
    public selectedOutlineBottom: boolean = true;
    public outlineColor: string = "#3F464B";
    public selectedOutlineThickness: number = 2;
    public scale: boolean = true;
    public scaleColor: string = "#8C9093";
    public scaleThickness: number = 2;
}
