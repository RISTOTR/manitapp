import { Routes } from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from "./home/home.component";
import { OfferComponent } from "./offer/offer.component";
import { HireComponent } from "./hire/hire.component";
import { NewOfferComponent} from "./New-Offer/New-Offer.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { OfferDetailComponent} from "./offer-detail/offer-detail.component";
import { HireService } from "./services/hire.service";
import {HireListComponent} from "./hireList/hireList.component";

export const routes: Routes = [
    
    { path: '', redirectTo:'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupComponent},
    { path: 'user', component: UserComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'hire/new/:id', component: HireComponent},
    {path: 'offer/new', component: NewOfferComponent},
    {path: 'user/edit', component: EditUserComponent},
    {path: 'offer/detail/:id', component: OfferDetailComponent},
    {path: 'hire/list', component: HireListComponent}
   
    
    
 

]