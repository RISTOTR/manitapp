import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user-interface';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  BASEURL: string = "http://localhost:3000";
  uploader: FileUploader = new FileUploader ({ 
    url: `${this.BASEURL}/api/user/edit`,
    method: "PUT"
  })

  user: User
  formEdit = {
    
    username: "",
    password: "",
    name: "",
    lastname: "",
    telephone: "",
    email:"",
    imgProfile: "",
    isProf: false, 
    professionType: "",
    //userTags: [""],
    // location: "",
    
  
  }
  

  constructor(public router: Router, public sessionService: SessionService, public userService: UserService) { }

  ngOnInit() {

    this.userService.getUser()
    .subscribe(user => {
      this.formEdit.username=user.username;
      this.formEdit.password=user.password;
      this.formEdit.name = user.name;
      this.formEdit.lastname= user.lastname;
      this.formEdit.telephone= user.telephone;
      this.formEdit.email=user.email;
      this.formEdit.imgProfile= user.imgProfile;
      this.formEdit.isProf= user.isProf;
      this.formEdit.professionType= user.professionType;
    
    })
 }

 editPage(){
  
  this.uploader.onBuildItemForm = (item, form) => {
    form.append('username', this.formEdit.username);
        form.append('password', this.formEdit.password);
        form.append('name', this.formEdit.name);
        form.append('lastname', this.formEdit.lastname);
        form.append('telephone', this.formEdit.telephone);
        form.append('email', this.formEdit.email);
        form.append('isProf', this.formEdit.isProf);
        form.append('professionType', this.formEdit.professionType)
      
      
  };
  this.uploader.uploadAll();
  this.uploader.onSuccessItem = (item, response, status, headers) => this.router.navigate(["/home"])
}

  }
