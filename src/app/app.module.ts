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
import { ImageComponent } from './image/image.component';
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
    ImageComponent,
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
    
    // provideStorage(()=> getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
