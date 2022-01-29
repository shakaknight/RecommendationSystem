import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/auth/login-page/login-page.component';
import { NavComponent } from '../mentee/component/nav/nav.component'
import { AboutComponent } from './component/about/about.component';
import { CreditsComponent } from './component/credits/credits.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditListComponent } from './component/edit-list/edit-list.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { MentorComponent } from './component/mentor/mentor.component';
import { NewListComponent } from './component/new-list/new-list.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { SearchComponent } from './component/search/search.component';
import { TaskViewComponent } from './component/task-view/task-view.component';

const routes: Routes = [
  {path: '', component: NavComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'recommend', component: RecommendComponent},
    {path: 'search', component: SearchComponent},
    {path: 'credits', component: CreditsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'new-task', component: NewTaskComponent },
    {path: 'your-mentor', component: MentorComponent },
    {path: 'publications', component: PublicationsComponent },
    {path: 'resources', component: ResourcesComponent },
    {path: 'lists', component: TaskViewComponent},
    {path: '',redirectTo:'/mentee/dashboard', pathMatch:'full'}
  ]
  },
  {path: '/logout',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule { }
