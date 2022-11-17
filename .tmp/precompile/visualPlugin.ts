import { Timeline } from "../../src/timeLine";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;

var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var Timeline14479910791001: IVisualPlugin = {
    name: 'Timeline14479910791001',
    displayName: 'Triskele Timeline Filter 2.0',
    class: 'Timeline',
    apiVersion: '3.5.0',
    create: (options: VisualConstructorOptions) => {
        if (Timeline) {
            return new Timeline(options);
        }
        throw 'Visual instance not found';
    },
    
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["Timeline14479910791001"] = Timeline14479910791001;
}
export default Timeline14479910791001;