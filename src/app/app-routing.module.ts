import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { HomeComponent } from './home/home.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { LoginComponent } from './login/login.component';
import { PostsTextComponent } from './posts-text/posts-text.component';
import { PostsComponent } from './posts/posts.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list-student',component: ListStudentComponent},
      { path: 'create', component: CreateStudentComponent },
      { path: 'update-student/:id', component: EditStudentComponent },
      { path: 'product', component: ProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'update-product/:id', component: EditProductComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'add-posts', component: AddPostsComponent },
      { path: 'posts-text/:id', component: PostsTextComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
