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
  NewTaskComponent],
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
    FontAwesomeModule
  ]
})
export class MentorModule { }
