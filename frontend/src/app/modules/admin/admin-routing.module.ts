import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/auth/login-page/login-page.component';
import { AboutComponent } from './component/about/about.component';
import { CreditsComponent } from './component/credits/credits.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavComponent } from './component/nav/nav.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { TaskViewComponent } from './component/task-view/task-view.component';

const routes: Routes = [
   {path: '', component: NavComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'credits', component: CreditsComponent},
      {path: 'about', component: AboutComponent},
      {path: 'new-task', component: NewTaskComponent},
      {path: 'lists', component: TaskViewComponent},
      {path: 'resources', component: ResourcesComponent},
      {path: 'publications', component: PublicationsComponent},
      {path: '',redirectTo:'/admin/dashboard', pathMatch:'full'}
    ]
  },
  {path: '/logout',component:LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
