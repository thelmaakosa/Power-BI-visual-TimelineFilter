import { Timeline } from "../../src/timeLine";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;

var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var Timeline1447991079100: IVisualPlugin = {
    name: 'Timeline1447991079100',
    displayName: 'Timeline 2.4.0',
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
    powerbi.visuals.plugins["Timeline1447991079100"] = Timeline1447991079100;
}
export default Timeline1447991079100;