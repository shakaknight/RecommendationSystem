import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  barChartOptions: ChartOptions = {
    responsive: true,
        legend: {
                        display: false
    },
  };
  barChartLabels: Label[] = ['10-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], backgroundColor:"rgba(0, 230, 230, 1)",label: 'Best Fruits' }
  ];
}
