import { Component, OnInit } from '@angular/core';
import { MembershipFunction } from './fuzzy-logic-system/membership-functions';
import { KnowledgeBase } from './fuzzy-logic-system/knowledge-base';
import { TemperatureLevel } from './fuzzy-logic-system/temperature-level';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fuzzy-logic';
  
  ngOnInit(): void {
    let m = new MembershipFunction();
    let k = new KnowledgeBase();
    let currentTemperature = 40;
    let targetTemperatureLevel = TemperatureLevel.veryCold;

    let output = m.computeOutput(currentTemperature);

    let currentTemperatureLevel = output.sort((a, b) => a.percentage - b.percentage)[0].temperatureLevel;

    let action = k.getAirConditionerAction(currentTemperatureLevel, targetTemperatureLevel);

    console.table(output);

    console.log('Current temperature level is ' + currentTemperatureLevel);
    console.log('Target temperature level is ' + targetTemperatureLevel);
    console.log('Air conditionar should ' + action);
  }
}
