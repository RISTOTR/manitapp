import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  BASEURL: string = "http://localhost:3000";
  uploader: FileUploader = new FileUploader ({   
    url: `${this.BASEURL}/api/auth/signup`,
    method:'POST'
  });
  error: string;

  formSignUp = {
    username: "",
    password: "",
    name: "",
    lastname: "",
    telephone: "",
     email:"",
    isProf: false, 
    professionType: "",
    //userTags: [""],
    // imgProfile: "",
    // location: "",
    
  }

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }

  signup() {
    
    // this.sessionService
      // .signup(this.formSignUp)
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('username', this.formSignUp.username);
        form.append('password', this.formSignUp.password);
        form.append('name', this.formSignUp.name);
        form.append('lastname', this.formSignUp.lastname);
        form.append('telephone', this.formSignUp.telephone);
        form.append('email', this.formSignUp.email);
        form.append('isProf', this.formSignUp.isProf);
        form.append('professionType', this.formSignUp.professionType)
         };
       this.uploader.uploadAll()
        this.router.navigate(["/login"])
     }

     profTrue(){
       
      this.formSignUp.isProf ? this.formSignUp.isProf = false : this.formSignUp.isProf = true;
    }
     

}
