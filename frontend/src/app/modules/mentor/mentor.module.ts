import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { NavComponent } from './component/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AboutComponent } from './component/about/about.component';
import { CreditsComponent } from './component/credits/credits.component';
import { RequestComponent } from './component/request/request.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenteeComponent } from './component/mentee/mentee.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { TaskViewComponent } from './component/task-view/task-view.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { CardComponent } from './component/card/card.component';
import { PieChartComponent } from './component/charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './component/charts/radar-chart/radar-chart.component';
import { SemiDonutComponent } from './component/charts/semi-donut/semi-donut.component';
import { BarChartComponent } from './component/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './component/charts/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './component/home/home.component';
import { ProblemComponent } from './component/problem/problem.component';
import { PopOneComponent } from './component/pop-one/pop-one.component';
import { MeetingComponent } from './component/meeting/meeting.component';
import { NewMeetingComponent } from './component/new-meeting/new-meeting.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
  NavComponent,
  AboutComponent,
  CreditsComponent,
  RequestComponent,
  DashboardComponent,
  MenteeComponent,
  PublicationsComponent,
  ResourcesComponent,
  TaskViewComponent,
  NewTaskComponent,
  CardComponent,
  PieChartComponent,
  RadarChartComponent,
  SemiDonutComponent,
  BarChartComponent,
  LineChartComponent,
  HomeComponent,
  ProblemComponent,
  PopOneComponent,
  MeetingComponent,
  NewMeetingComponent],
  imports: [
    CommonModule,
    MentorRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgbModule,
    FontAwesomeModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class MentorModule { }
