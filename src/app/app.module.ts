import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MyuserComponent } from './myuser/myuser.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QrCodeModule } from 'ng-qrcode';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ResultsComponent } from './results/results.component';
import { NgxPrintModule } from 'ngx-print';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OurUsersComponent } from './our-users/our-users.component';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { SearchReportComponent } from './search-report/search-report.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AddUserComponent,
    MyuserComponent,
    LoginComponent,
    ResultsComponent,
    EditUserComponent,
    OurUsersComponent,
    AllClientsComponent,
    SearchReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCYpfuq2R0_zKZYDxSgFpVUUO6BZ6wH6dE",
      authDomain: "saif-aldin.firebaseapp.com",
      projectId: "saif-aldin",
      storageBucket: "saif-aldin.appspot.com",
      messagingSenderId: "768633716378",
      appId: "1:768633716378:web:d57728c89465f2e616e923",
      measurementId: "G-RRSC19HT1K"
    }),
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    Ng2SmartTableModule,
    QrCodeModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
