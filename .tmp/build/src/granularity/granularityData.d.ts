import powerbiVisualsApi from "powerbi-visuals-api";
import { IGranularity } from "./granularity";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { Calendar } from "../calendars/calendar";
import { dateFormatSettings } from "../settings/dateFormatSettings";
export declare class GranularityData {
    /**
     * Returns the date of the previos day
     * @param date The following date
     */
    static PREVIOUS_DAY(date: Date): Date;
    /**
     * Returns the date of the next day
     * @param date The previous date
     */
    static NEXT_DAY(date: Date): Date;
    private static DayOffset;
    private dates;
    private granularities;
    private endingDate;
    private groupXOffset;
    private groupWidth;
    constructor(startDate: Date, endDate: Date);
    /**
     * Adds a new granularity to the array of granularities.
     * Resets the new granularity, adds all dates to it, and then edits the last date period with the ending date.
     * @param granularity The new granularity to be added
     */
    addGranularity(granularity: IGranularity): void;
    /**
     * Renders all available granularities
     */
    renderGranularities(viewport: powerbiVisualsApi.IViewport, props: IGranularityRenderProps): void;
    /**
     * Returns a specific granularity from the array of granularities
     * @param index The index of the requested granularity
     */
    getGranularity(index: number): IGranularity;
    createGranularities(calendar: Calendar, locale: string, localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager, dateFormatSettings: dateFormatSettings): void;
    createLabels(): void;
    /**
     * Returns an array of dates with all the days between the start date and the end date
     */
    private setDatesRange;
}
