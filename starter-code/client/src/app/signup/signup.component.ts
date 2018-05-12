import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error: string;

  formSignUp = {
    username: "",
    password: "",
    name: "",
    lastname: "",
    telephone: "",
    email:"",
  
    isProf: false, 
    //professionType: "",
    userTags: [""],
     imgProfile: "",
    location: ""
    
  }

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.sessionService
      .signup(this.formSignUp)
      .subscribe(user => {
        console.log(user);
        this.router.navigate(["/home"])
      });
  }

}
