import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import { DividerModule } from "primeng/divider";
// import {provideStorage, getStorage} from '@angular/fire/storage'
import {AngularFireStorageModule } from '@angular/fire/compat/storage';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { PasswordModule } from "primeng/password";
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { AddPostsComponent } from './add-posts/add-posts.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import { PostsComponent } from './posts/posts.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateStudentComponent,
    EditStudentComponent,
    ListStudentComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MatDialogComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    AddPostsComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    DividerModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    PasswordModule,
    FileUploadModule,
    HttpClientModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule
    // provideStorage(()=> getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
