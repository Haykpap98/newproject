import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { HomeComponent } from './home/home.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create',    component: CreateStudentComponent },
      { path: 'list-student', component: ListStudentComponent },
      { path: 'update-student/:id', component: EditStudentComponent },
    ],
  },
  // { path: '**', component: HomeComponent },
  //  {path: '',redirectTo: '/create', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
