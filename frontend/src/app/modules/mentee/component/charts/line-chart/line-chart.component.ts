import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
// import * as c3 from 'c3';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
 
lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 70], label: 'Crude oil prices' },
    { data: [60, 75, 70, 66, 75, 80], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['Jan 1', 'Jan 7', 'Jan 21', 'Jan 28', 'Feb 4', 'Feb 11'];

  lineChartOptions = {
    responsive: true,
    legend: {
     display: false
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0, 230, 230, 1)',
      backgroundColor: ['rgba(255,255,0,0)',]
    },
    {
      borderColor: 'rgb(153, 51, 255)',
      backgroundColor: ['rgba(255,255,0,0)',]
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  
}
