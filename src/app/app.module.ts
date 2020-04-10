import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MatFormField } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';
import { AppService } from './app.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { UserRegistrationFormDialogComponent } from './components/user-registration-form-dialog/user-registration-form-dialog.component';
import { CurrentUserEntryTableComponent } from './components/current-user-entry-table/current-user-entry-table.component';
import { EndUserSessionDialogComponent } from './components/end-user-session-dialog/end-user-session-dialog.component';
import { UserEntryHistoryComponent } from './components/user-entry-history/user-entry-history.component';
import { MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormDialogComponent,
    CurrentUserEntryTableComponent,
    EndUserSessionDialogComponent,
    UserEntryHistoryComponent,
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
  entryComponents: [UserRegistrationFormDialogComponent, EndUserSessionDialogComponent]
})
export class AppModule { }
