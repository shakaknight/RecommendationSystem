import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenteeRoutingModule } from './mentee-routing.module';
import { CreditsComponent } from './component/credits/credits.component';
import { AboutComponent } from './component/about/about.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
// import { TaskViewComponent } from './component/task-manager/task-view/task-view.component';
import { NewListComponent } from './component/new-list/new-list.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { EditListComponent } from './component/edit-list/edit-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TaskViewComponent } from './component/task-view/task-view.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MentorComponent } from './component/mentor/mentor.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { PublicationsComponent } from './component/publications/publications.component';
// import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    CreditsComponent,
    AboutComponent,
    // TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    EditTaskComponent,
    EditListComponent,
    TaskViewComponent,
    MentorComponent,
    ResourcesComponent,
    PublicationsComponent,
  ],
  imports: [
    CommonModule,
    MenteeRoutingModule,
    MatButtonModule,
    // BrowserModule,
    // AppRoutingModule,
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
  ]
})
export class MenteeModule { }
