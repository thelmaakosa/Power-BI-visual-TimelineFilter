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
    public position: string = "right";
    public scale: boolean = true;
    public scaleThickness: number = 2;
    public scaleColor: string = "#8C9093";
    public fontColor: string = "#00458F";
    public selectedfillColor: string = "transparent";
    public transparency: number = 50;
    public selectedOutlineLeft: boolean = false;
    public selectedOutlineRight: boolean = false;
    public selectedOutlineTop: boolean = false;
    public selectedOutlineBottom: boolean = true;
    public selectedOutlineThickness: number = 2;
    public selectedOutlineRadius: number = 0;
    public outlineColor: string = "#3F464B";
    public innerPadding: number = 50;
    public fontFamily: string = 'Segoe UI';
    public textSize: number = 9;
    public Bold: boolean = false;
    public Italic: boolean = false;
    public Underline: boolean = false;
    public granularity: GranularityType = GranularityType.month;
    public granularityYearVisibility: boolean = true;
    public granularityQuarterVisibility: boolean = true;
    public granularityMonthVisibility: boolean = true;
    public granularityWeekVisibility: boolean = true;
    public granularityDayVisibility: boolean = true;
}
