import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './modules/mentee/component/dashboard/dashboard.component';
import { NavComponent } from './modules/mentee/component/nav/nav.component';
import { RecommendComponent } from './modules/mentee/component/recommend/recommend.component';
import { SearchComponent } from './modules/mentee/component/search/search.component';

const routes: Routes = [
  {path: 'login',component: LoginPageComponent},
  {path: 'forgot-password',component: ForgotPasswordComponent},
  {path: '',redirectTo: '/login', pathMatch: 'full'},
  {path: 'sign-up',component: SignupPageComponent},
  {
    path: 'mentee',
    // canActivate: [AuthGuard],
    loadChildren: () => 
      import('./modules/mentee/mentee.module').then((m) => m.MenteeModule)
  },
  {
    path: 'mentor',
    // canActivate: [AuthGuard],
    loadChildren: () => 
      import('./modules/mentor/mentor.module').then((m) => m.MentorModule)
  },  
  {
    path: 'admin',
    loadChildren: () => 
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {path: '**',component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
