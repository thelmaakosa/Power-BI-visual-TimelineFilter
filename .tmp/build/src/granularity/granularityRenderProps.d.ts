import { Selection } from "d3-selection";
import { GranularitySettings } from "../settings/granularitySettings";
import { GranularityType } from "./granularityType";
export interface IGranularityRenderProps {
    selection: Selection<any, any, any, any>;
    granularSettings: GranularitySettings;
    selectPeriodCallback: (granularityType: GranularityType) => void;
}
