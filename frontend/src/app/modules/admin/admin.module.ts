import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './component/nav/nav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { TaskViewComponent } from './component/task-view/task-view.component';
import { LogsComponent } from './component/logs/logs.component';
import { CreditsComponent } from './component/credits/credits.component';
import { AboutComponent } from './component/about/about.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { PopTwoComponent } from './component/pop-two/pop-two.component';
import { HomeComponent } from './component/home/home.component';
import { BarChartComponent } from './component/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './component/charts/line-chart/line-chart.component';
import { CardComponent } from './component/card/card.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    PopUpComponent,
    ResourcesComponent,
    TaskViewComponent,
    LogsComponent,
    CreditsComponent,
    AboutComponent,
    NewTaskComponent,
    PublicationsComponent,
    PopTwoComponent,
    HomeComponent,
    BarChartComponent,
    LineChartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
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
    LayoutModule,
    ChartsModule
  ]
})
export class AdminModule { }
