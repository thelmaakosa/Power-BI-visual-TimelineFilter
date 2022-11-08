import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import { CalendarSettings } from "./calendarSettings";
import { CellsSettings } from "./cellsSettings";
import { CursorSettings } from "./cursorSettings";
import { ForceSelectionSettings } from "./forceSelectionSettings";
import { GeneralSettings } from "./generalSettings";
import { GranularitySettings } from "./granularitySettings";
import { LabelsSettings } from "./labelsSettings";
import { ScrollAutoAdjustment } from "./scrollAutoAdjustment";
import { calendaTypeSettings } from "./calendaTypeSettings";
import { dateFormatSettings } from "./dateFormatSettings";
import { rangeHeaderSettings } from "./rangeHeaderSettings";
export declare class Settings extends dataViewObjectsParser.DataViewObjectsParser {
    general: GeneralSettings;
    calendaType: calendaTypeSettings;
    calendar: CalendarSettings;
    forceSelection: ForceSelectionSettings;
    rangeHeader: rangeHeaderSettings;
    cells: CellsSettings;
    granularity: GranularitySettings;
    labels: LabelsSettings;
    scrollAutoAdjustment: ScrollAutoAdjustment;
    cursor: CursorSettings;
    dateFormat: dateFormatSettings;
}
