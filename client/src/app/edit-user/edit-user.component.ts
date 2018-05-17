import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../Interfaces/user-interface';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  uploader: FileUploader = new FileUploader ({ 
    url: `${environment.BASEURL}/api/user/edit`,
    method: "PUT"
  })

  user: User;

  formEdit = {
    username:"",
    name: "",
    lastname: "",
    email:"",
    imgProfile:"",
    ifProf: false, 
    professsionType: "",
  }

  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
    .subscribe(user => {
      this.formEdit.username = user.username;
      this.formEdit.name = user.name;
      this.formEdit.lastname = user.lastname;
      this.formEdit.email = user.email;
      this.formEdit.imgProfile =user.imgProfile;
      this.formEdit.ifProf = user.ifProf;
      this.formEdit.professsionType = user.professsionType;
    })
  }

  editProfile(){
   
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('username', this.formEdit.username);
        form.append('name', this.formEdit.name);
        form.append('lastname', this.formEdit.lastname);
        form.append('email', this.formEdit.email);
        form.append('imgProfile', this.formEdit.imgProfile);
        form.append('ifProf', this.formEdit.ifProf);
        form.append('professionType', this.formEdit.professsionType);
    };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => this.router.navigate(["/home"])
  }

}

