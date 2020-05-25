import { TemperatureLevel } from './temperature-level';

export interface MembershipFunctionOutput {
    temperatureLevel: TemperatureLevel;
    percentage: number;
}

export class MembershipFunction {

    public computeOutput(temperature: number): MembershipFunctionOutput[] {
        let output = new Array<MembershipFunctionOutput>();
    
        if (temperature >= 0 && temperature <= 10) {
            output.push({
                temperatureLevel: TemperatureLevel.veryCold,
                percentage: this.triangleMF(temperature, 0, 0, 10),
            });
        }
        if (temperature >= 0 && temperature <= 20) {
            output.push({
                temperatureLevel: TemperatureLevel.cold,
                percentage: this.triangleMF(temperature, 0, 10, 20),
            });
        }
        if (temperature >= 10 && temperature <= 30) {
            output.push({
                temperatureLevel: TemperatureLevel.warm,
                percentage: this.triangleMF(temperature, 10, 20, 30),
            });
        }
        if (temperature >= 20 && temperature <= 40) {
            output.push({
                temperatureLevel: TemperatureLevel.hot,
                percentage: this.triangleMF(temperature, 20, 30, 40),
            });
        }
        if (temperature >= 30) {
            output.push({
                temperatureLevel: TemperatureLevel.veryHot,
                percentage: this.triangleMF(temperature, 30, 40, 40),
            });
        }
    
        return output.filter(o => o.percentage != 0);
    }
    
    private triangleMF(x: number, a: number, b: number, c: number): number {
        return Math.max(Math.min((x - a) / (b - a), (c - x) / (c - b)), 0);
    }
    
    private trapezoidMF(x: number, a: number, b: number, c: number, d: number): number {
        return Math.max(Math.min((x - a) / (b - a), 1, (d - x) / (d - c)), 0 );
    }
}
