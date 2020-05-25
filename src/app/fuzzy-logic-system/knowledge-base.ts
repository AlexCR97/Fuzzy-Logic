import { TemperatureLevel } from './temperature-level';

export enum AirConditionerAction {
    heat = 'Heat',
    cool = 'Cool',
    noChange = 'No change',
}

export class KnowledgeBase {

    private matrix = new Map<TemperatureLevel, Map<TemperatureLevel, AirConditionerAction>>([
        // Very Cold
        [TemperatureLevel.veryCold, new Map<TemperatureLevel, AirConditionerAction>([
            [TemperatureLevel.veryCold, AirConditionerAction.noChange],
            [TemperatureLevel.cold, AirConditionerAction.heat],
            [TemperatureLevel.warm, AirConditionerAction.heat],
            [TemperatureLevel.hot, AirConditionerAction.heat],
            [TemperatureLevel.veryHot, AirConditionerAction.heat],
        ])],
        // Cold
        [TemperatureLevel.cold, new Map<TemperatureLevel, AirConditionerAction>([
            [TemperatureLevel.veryCold, AirConditionerAction.cool],
            [TemperatureLevel.cold, AirConditionerAction.noChange],
            [TemperatureLevel.warm, AirConditionerAction.heat],
            [TemperatureLevel.hot, AirConditionerAction.heat],
            [TemperatureLevel.veryHot, AirConditionerAction.heat],
        ])],
        // Warm
        [TemperatureLevel.warm, new Map<TemperatureLevel, AirConditionerAction>([
            [TemperatureLevel.veryCold, AirConditionerAction.cool],
            [TemperatureLevel.cold, AirConditionerAction.cool],
            [TemperatureLevel.warm, AirConditionerAction.noChange],
            [TemperatureLevel.hot, AirConditionerAction.heat],
            [TemperatureLevel.veryHot, AirConditionerAction.heat],
        ])],
        // Hot
        [TemperatureLevel.hot, new Map<TemperatureLevel, AirConditionerAction>([
            [TemperatureLevel.veryCold, AirConditionerAction.cool],
            [TemperatureLevel.cold, AirConditionerAction.cool],
            [TemperatureLevel.warm, AirConditionerAction.cool],
            [TemperatureLevel.hot, AirConditionerAction.noChange],
            [TemperatureLevel.veryHot, AirConditionerAction.heat],
        ])],
        // Very Hot
        [TemperatureLevel.veryHot, new Map<TemperatureLevel, AirConditionerAction>([
            [TemperatureLevel.veryCold, AirConditionerAction.cool],
            [TemperatureLevel.cold, AirConditionerAction.cool],
            [TemperatureLevel.warm, AirConditionerAction.cool],
            [TemperatureLevel.hot, AirConditionerAction.cool],
            [TemperatureLevel.veryHot, AirConditionerAction.noChange],
        ])],
    ]);

    public getAirConditionerAction(currentTemperature: TemperatureLevel, targetTemperature: TemperatureLevel) {
        return this.matrix.get(currentTemperature).get(targetTemperature);
    }
}
