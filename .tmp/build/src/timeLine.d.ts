import "../style/visual.less";
import "core-js/stable";
import { Selection as D3Selection } from "d3-selection";
import powerbiVisualsApi from "powerbi-visuals-api";
import { AdvancedFilter, IFilterColumnTarget } from "powerbi-models";
import { ICursorDataPoint, ITimelineCursorOverElement, ITimelineData, ITimelineProperties } from "./dataInterfaces";
import { CalendarSettings } from "./settings/calendarSettings";
import { CellsSettings } from "./settings/cellsSettings";
import { LabelsSettings } from "./settings/labelsSettings";
import { Settings } from "./settings/settings";
import { GranularityData } from "./granularity/granularityData";
import { GranularityType } from "./granularity/granularityType";
import { ITimelineDatePeriodBase } from "./datePeriod/datePeriod";
import { Calendar } from "./calendars/calendar";
import { dateFormatSettings } from "./settings/dateFormatSettings";
export declare class Timeline implements powerbiVisualsApi.extensibility.visual.IVisual {
    static SET_VALID_CALENDAR_SETTINGS(calendarSettings: CalendarSettings): void;
    static SELECT_CURRENT_PERIOD(datePeriod: ITimelineDatePeriodBase, granularity: GranularityType, calendar: any): {
        startDate: Date;
        endDate: Date;
    };
    static CONVERTER(timelineData: ITimelineData, timelineProperties: ITimelineProperties, timelineGranularityData: GranularityData, dataView: powerbiVisualsApi.DataView, initialized: boolean, timelineSettings: Settings, viewport: powerbiVisualsApi.IViewport, previousCalendar: Calendar): Calendar;
    static SELECT_PERIOD(datePeriod: ITimelineDatePeriodBase, granularity: GranularityType, calendar: any, periodDate: Date): {
        startDate: Date;
        endDate: Date;
    };
    static SELECT_LAST_PERIOD(datePeriod: ITimelineDatePeriodBase, granularity: GranularityType, calendar: any, periodDate: Date, settings: Settings): {
        startDate: Date;
        endDate: Date;
    };
    static ARE_VISUAL_UPDATE_OPTIONS_VALID(options: powerbiVisualsApi.extensibility.visual.VisualUpdateOptions): boolean;
    static IS_DATA_VIEW_CATEGORICAL_VALID(dataViewCategorical: powerbiVisualsApi.DataViewCategorical): boolean;
    private static TimelineMargins;
    private static MinSizeOfViewport;
    private static DefaultTextYPosition;
    private static CellsYPositionFactor;
    private static CellsYPositionOffset;
    private static SelectedTextSelectionFactor;
    private static SelectedTextSelectionYOffset;
    private static LabelSizeFactor;
    private static TimelinePropertiesHeightOffset;
    private static DefaultCursorDatapointX;
    private static DefaultCursorDatapointY;
    private static DefaultSelectionStartIndex;
    private static CellHeightDivider;
    private static DefaultFontFamily;
    private static TextWidthMiddleDivider;
    private static SvgWidthOffset;
    private static DefaultYDiff;
    private static DefaultOverflow;
    private static CellWidthLastFactor;
    private static CellWidthNotLastFactor;
    private static LabelIdOffset;
    private static GranularityNamesLength;
    private static DefaultRangeTextSelectionY;
    private static DefaultRangeTextSelectionX;
    private static ViewportWidthAdjustment;
    static labelsSettings: LabelsSettings;
    private static filterObjectProperty;
    private static TimelineSelectors;
    private static updateCursors;
    private static isDataViewValid;
    private static setMeasures;
    private static parseSettings;
    /**
     * It's public for testability
     */
    timelineData: ITimelineData;
    calendar: Calendar;
    private settings;
    private timelineProperties;
    private timelineGranularityData;
    private rootSelection;
    private headerWrapperSelection;
    private headerSelection;
    private mainSvgSelection;
    private mainSvgWrapperSelection;
    private rangeTextSelection;
    private mainGroupSelection;
    private yearLabelsSelection;
    private quarterLabelsSelection;
    private monthLabelsSelection;
    private weekLabelsSelection;
    private dayLabelsSelection;
    private cellsSelection;
    private cursorGroupSelection;
    private selectorSelection;
    private options;
    private dataView;
    private svgWidth;
    private datePeriod;
    private prevFilteredStartDate;
    private prevFilteredEndDate;
    private initialized;
    private host;
    private locale;
    private localizationManager;
    private horizontalAutoScrollingPositionOffset;
    private selectedGranulaPos;
    private isForceSelectionReset;
    private selectionManager;
    private cursorDragBehavior;
    private calendarFactory;
    constructor(options: powerbiVisualsApi.extensibility.visual.VisualConstructorOptions);
    clearUserSelection(): void;
    doesPeriodSlicerRectPositionNeedToUpdate(granularity: GranularityType): boolean;
    redrawPeriod(granularity: GranularityType): void;
    update(options: powerbiVisualsApi.extensibility.visual.VisualUpdateOptions): void;
    fillCells(visSettings: Settings): void;
    renderCells(timelineData: ITimelineData, timelineProperties: ITimelineProperties, yPos: number, dateFormatSettings: dateFormatSettings, calendarSettings: CalendarSettings): void;
    renderCursors(timelineData: ITimelineData, cellHeight: number, cellsYPosition: number, cellSettings: CellsSettings): D3Selection<any, any, any, any>;
    renderTimeRangeText(timelineData: ITimelineData, settings: Settings): void;
    setSelection(timelineData: ITimelineData): void;
    applyDatePeriod(startDate: Date, endDate: Date, target: IFilterColumnTarget): void;
    getFilterAction(startDate: Date, endDate: Date): powerbiVisualsApi.FilterAction;
    /**
     * Changes the current granularity depending on the given granularity type
     * Separates the new granularity's date periods which contain the start/end selection
     * Unseparates the date periods of the previous granularity.
     * @param granularity The new granularity type
     */
    changeGranularity(granularity: GranularityType, startDate: Date, endDate: Date): void;
    createFilter(startDate: Date, endDate: Date, target: IFilterColumnTarget): AdvancedFilter;
    clearSelection(target: IFilterColumnTarget): void;
    /**
     * This function returns the values to be displayed in the property pane for each object.
     * Usually it is a bind pass of what the property pane gave you, but sometimes you may want to do
     * validation and return other values/defaults.
     */
    enumerateObjectInstances(options: powerbiVisualsApi.EnumerateVisualObjectInstancesOptions): powerbiVisualsApi.VisualObjectInstanceEnumeration;
    selectPeriod(granularityType: GranularityType): void;
    onCursorDrag(currentCursor: ICursorDataPoint): void;
    /**
     * Note: Public for testability.
     */
    findCursorOverElement(position: number): ITimelineCursorOverElement;
    onCursorDragEnd(): void;
    private updatePrevFilterState;
    private adjustFilterDatePeriod;
    private adjustHeightOfElements;
    private renderGranularityFrame;
    private handleContextMenu;
    private handleClick;
    addElements(): void;
    private createDatePeriod;
    private createTimelineData;
    private updateCalendar;
    private render;
    private renderBunchOfLabels;
    private calculateYOffset;
    private renderLabels;
    private clearData;
    private onCellClickHandler;
    private scrollAutoFocusFunc;
    private toggleForceSelectionOptions;
    private turnOffForceSelectionOptions;
}
