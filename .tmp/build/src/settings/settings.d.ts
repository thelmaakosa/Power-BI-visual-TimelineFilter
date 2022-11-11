import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import { CalendarSettings } from "./calendarSettings";
import { CellsSettings } from "./cellsSettings";
import { CursorSettings } from "./cursorSettings";
import { ForceSelectionSettings } from "./forceSelectionSettings";
import { GeneralSettings } from "./generalSettings";
import { GranularitySettings } from "./granularitySettings";
import { LabelsSettings } from "./labelsSettings";
import { ScrollAutoAdjustment } from "./scrollAutoAdjustment";
import { WeekDaySettings } from "./weekDaySettings";
import { WeeksDetermintaionStandardsSettings } from "./weeksDetermintaionStandardsSettings";
import { dateFormatSettings } from "./dateFormatSettings";
import { rangeHeaderSettings } from "./rangeHeaderSettings";
export declare class Settings extends dataViewObjectsParser.DataViewObjectsParser {
    general: GeneralSettings;
    calendar: CalendarSettings;
    forceSelection: ForceSelectionSettings;
    weekDay: WeekDaySettings;
    rangeHeader: rangeHeaderSettings;
    cells: CellsSettings;
    granularity: GranularitySettings;
    labels: LabelsSettings;
    scrollAutoAdjustment: ScrollAutoAdjustment;
    cursor: CursorSettings;
    weeksDetermintaionStandards: WeeksDetermintaionStandardsSettings;
    dateFormat: dateFormatSettings;
}
