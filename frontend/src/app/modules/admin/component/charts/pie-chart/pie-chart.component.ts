import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  doughnutChartLabels: Label[] = ['Desktop', 'Tablet', 'Mobile'];
doughnutChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    // radius: "50%"
    //  rotation: 1 * Math.PI,
    // circumference: 1 * Math.PI
  };
    doughnutChartColors: Color[] = [
    {
      borderColor: 'rgb(217, 217, 217)',
      backgroundColor: ['rgb(0, 255, 255)','rgb(153, 102, 255)','rgb(255, 133, 51)']
    },
  ];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
