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
import { AgmCoreModule } from '@agm/core';
import { OfferComponent } from './offer/offer.component';
import { HireComponent } from './hire/hire.component';
import { UserService } from './services/user.service';
import { NewOfferComponent } from './New-Offer/New-Offer.component';
import { OfferService } from './services/offer.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { HireService } from './services/hire.service';
import { HireListComponent } from './hireList/hireList.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserComponent,
    SignupComponent,
    HomeComponent,
    FileSelectDirective,
    OfferComponent,
    HireComponent,
    UserComponent,
    NewOfferComponent,
    NavBarComponent,
    EditOfferComponent,
    EditUserComponent,
    OfferDetailComponent,
    HireListComponent,
  
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB90SbQDcUbB3g32fUUKuEDefCYn62S_zE'
    })
  ],
  providers: [SessionService,UserService,OfferService,HireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
