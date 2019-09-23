import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MatToolbar, MatFormField, MatSelect, MatOption } from '@angular/material';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';
import { AppService } from './app.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { UserRegistrationFormDialogComponent } from './components/user-registration-form-dialog/user-registration-form-dialog.component';
import { CurrentUserEntryTableComponent } from './components/current-user-entry-table/current-user-entry-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserRegistrationFormDialogComponent,
    CurrentUserEntryTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [AppService, FirebaseService],
  bootstrap: [AppComponent],
  exports: [MatFormField, MatSelect, MatOption],
  entryComponents:[UserRegistrationFormDialogComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);
