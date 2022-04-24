import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/auth/login-page/login-page.component';
import { AboutComponent } from './component/about/about.component';
import { CreditsComponent } from './component/credits/credits.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { MenteeComponent } from './component/mentee/mentee.component';
import { NavComponent } from './component/nav/nav.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { RequestComponent } from './component/request/request.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { TaskViewComponent } from './component/task-view/task-view.component';
import { ProblemComponent } from './component/problem/problem.component';
import { MeetingComponent } from './component/meeting/meeting.component';

const routes: Routes = [
  {path: '', component: NavComponent,
  children: [
    {path: 'dashboard', component: HomeComponent},
    {path: 'request', component: RequestComponent},
    {path: 'your-mentee', component: MenteeComponent},
    {path: 'credits', component: CreditsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'publications', component: PublicationsComponent },
    {path: 'resources', component: ResourcesComponent },
    {path: 'problem', component: ProblemComponent },
    {path: 'lists', component: TaskViewComponent},
    {path: 'meetings', component: MeetingComponent},
    {path: '',redirectTo:'/mentor/dashboard', pathMatch:'full'}
  ]
  },
  {path: '/logout',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { }
