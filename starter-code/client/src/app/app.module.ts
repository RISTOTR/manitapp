import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 import { RouterModule, Routes } from '@angular/router';
 import { routes } from './routes';
 import { FileSelectDirective } from "ng2-file-upload";

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserComponent,
    SignupComponent,
    HomeComponent,
    FileSelectDirective
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
