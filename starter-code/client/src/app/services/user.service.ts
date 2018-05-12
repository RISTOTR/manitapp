import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from "../interfaces/user-interface";

@Injectable()
export class UserService {
    user: User
options: any = {withCredentials: true}

constructor(private http: Http) { }

editUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/edit`)
      .map(res => res.json());
  }

//Borrar perfil Usuario
deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`)
      .map(res => res.json());
  }

  
  //Perfil privado del usuario
  
  profileUser() {
    console.log("Hola")
    return this.http
      .get(`${environment.BASEURL}/api/user/profile`, this.options)
      .map(res => {
        console.log('jjj')
        return res.json()
      })
       .map(user => {
         console.log(user)
       this.user = user
        return user
      });   
  }

}



}
