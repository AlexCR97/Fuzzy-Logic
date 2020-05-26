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

  ngOnInit(): void {
    this.computeValues();
  }

  computeValues() {
    this.computedTempLevels = this.membershipFunction.computeOutput(this.currentTemp);
    this.mostAccurateTempLevel = this.computedTempLevels.sort((a, b) => a.percentage - b.percentage)[0].temperatureLevel;
    this.acAction = this.knowledgeBase.getAirConditionerAction(this.mostAccurateTempLevel, this.desiredTempLevel);

    console.log('Computed temperatre levels are:');
    console.table(this.computedTempLevels);

    console.log('Current temperature level is ' + this.currentTemp);
    console.log('Target temperature level is ' + this.desiredTempLevel);
    console.log('Air conditionar should ' + this.acAction);
  }

  onCurrentTempChange(temperature: number) {
    this.computeValues();
  }

  onDesiredTempLevelChange(index: number) {
    this.desiredTempLevel = this.tempLevels[index];
    this.computeValues();
  }
}
