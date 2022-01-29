import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/auth/login-page/login-page.component';
import { AboutComponent } from './component/about/about.component';
import { CreditsComponent } from './component/credits/credits.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenteeComponent } from './component/mentee/mentee.component';
import { NavComponent } from './component/nav/nav.component';
import { RequestComponent } from './component/request/request.component';

const routes: Routes = [
  {path: '', component: NavComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'request', component: RequestComponent},
    {path: 'your-mentee', component: MenteeComponent},
    {path: 'credits', component: CreditsComponent},
    {path: 'about', component: AboutComponent},
  //   // { path: 'new-task', component: NewTaskComponent },
  //   // {path: 'lists', component: TaskViewComponent},
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
