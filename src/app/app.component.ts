import { Component, OnInit } from '@angular/core';
import { MembershipFunction, MembershipFunctionOutput } from './fuzzy-logic-system/membership-functions';
import { KnowledgeBase, AirConditionerAction } from './fuzzy-logic-system/knowledge-base';
import { TemperatureLevel } from './fuzzy-logic-system/temperature-level';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'fuzzy-logic';
  
  private tempLevels = [
    TemperatureLevel.veryCold,
    TemperatureLevel.cold,
    TemperatureLevel.warm,
    TemperatureLevel.hot,
    TemperatureLevel.veryHot,
  ];

  public minTemp = 0;
  public maxTemp = 40;
  public minTempLevelIndex = 0;
  public maxTempLevelIndex = this.tempLevels.length - 1;

  public currentTemp = this.maxTemp / 2;
  public desiredTempLevelIndex = this.maxTempLevelIndex / 2;
  public desiredTempLevel = this.tempLevels[this.desiredTempLevelIndex];

  public computedTempLevels: MembershipFunctionOutput[];
  public mostAccurateTempLevel: TemperatureLevel;
  public acAction: AirConditionerAction;

  public membershipFunction = new MembershipFunction();
  public knowledgeBase = new KnowledgeBase();

  // GUI Variables
  private backgrounds = new Map<TemperatureLevel, string>([
    [TemperatureLevel.veryCold, 'bg-very-cold'],
    [TemperatureLevel.cold, 'bg-cold'],
    [TemperatureLevel.warm, 'bg-warm'],
    [TemperatureLevel.hot, 'bg-hot'],
    [TemperatureLevel.veryHot, 'bg-very-hot'],
  ]);

  private particles = new Map<TemperatureLevel, string>([
    [TemperatureLevel.veryCold, 'snow-particle'],
    [TemperatureLevel.cold, ''],
    [TemperatureLevel.warm, ''],
    [TemperatureLevel.hot, ''],
    [TemperatureLevel.veryHot, 'hot-particle'],
  ]);

  private layers = new Map<TemperatureLevel, string>([
    [TemperatureLevel.veryCold, 'snow-layer'],
    [TemperatureLevel.cold, ''],
    [TemperatureLevel.warm, ''],
    [TemperatureLevel.hot, ''],
    [TemperatureLevel.veryHot, 'hot-layer'],
  ]);

  public background: string;
  public particle: string;
  public layer: string;

  ngOnInit(): void {
    this.computeValues();
    this.updateWeather();
  }

  computeValues() {
    this.computedTempLevels = this.membershipFunction.computeOutput(this.currentTemp);
    this.mostAccurateTempLevel = this.computedTempLevels.sort((a, b) => b.percentage - a.percentage)[0].temperatureLevel;
    this.acAction = this.knowledgeBase.getAirConditionerAction(this.mostAccurateTempLevel, this.desiredTempLevel);

    console.log('Computed temperatre levels are:');
    console.table(this.computedTempLevels);

    console.log('Current temperature level is ' + this.currentTemp);
    console.log('Target temperature level is ' + this.desiredTempLevel);
    console.log('Air conditionar should ' + this.acAction);
  }

  onCurrentTempChange(temperature: number) {
    this.computeValues();
    this.updateWeather();
  }

  onDesiredTempLevelChange(index: number) {
    this.desiredTempLevel = this.tempLevels[index];
    this.computeValues();
  }

  updateWeather() {
    this.background = this.backgrounds.get(this.mostAccurateTempLevel);
    this.particle = this.particles.get(this.mostAccurateTempLevel);
    this.layer = this.layers.get(this.mostAccurateTempLevel);
  }
}
