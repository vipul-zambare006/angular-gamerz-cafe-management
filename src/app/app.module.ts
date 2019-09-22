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
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { DataService } from './services/data.service';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,

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
    InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  exports: [MatFormField, MatSelect, MatOption]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
