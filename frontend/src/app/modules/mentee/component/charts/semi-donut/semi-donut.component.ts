import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-semi-donut',
  templateUrl: './semi-donut.component.html',
  styleUrls: ['./semi-donut.component.scss']
})
export class SemiDonutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  doughnutChartLabels: Label[] = ['Desktop', 'Tablet', 'Mobile'];
doughnutChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
     rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    borderWidth: 100
  };
    doughnutChartColors: Color[] = [
    {
      borderColor: 'rgb(217, 217, 217)',
      backgroundColor: ['rgb(255, 133, 51)','rgb(217, 217, 217)']
    },
  ];
  doughnutChartData: MultiDataSet = [
    [70, 30]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
