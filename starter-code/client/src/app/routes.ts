import { Routes } from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from "./home/home.component";
import { OfferComponent } from "./offer/offer.component";
import { HireComponent } from "./hire/hire.component";



export const routes: Routes = [
    
    { path: '', redirectTo:'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupComponent},
    { path: 'user', component: UserComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'hire', component: HireComponent},
    
    
 
//   { path: 'threads/new', component: NewThreadComponent},
//   { path: 'threads/:id', component: SingleThreadComponent}
]