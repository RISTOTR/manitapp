import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from "../interfaces/user-interface";

@Injectable()
export class UserService {
 
user: User;
options: any = {withCredentials: true}

constructor(private http: Http) { }

 getUser() {
  return this.http
     .get(`${environment.BASEURL}/api/user/profile`, this.options)
      .map(res => res.json());
 }

editUser(user) {
    return this.http
      .put(`${environment.BASEURL}/api/user/edit`, user, this.options)
      .map(res => res.json());
  }

//Borrar perfil Usuario
deleteUser() {
    return this.http
      .get(`${environment.BASEURL}/api/user/delete`)
      .map(res => res.json());
  }

  
  //Perfil privado del usuario
  
  // profileUser() {
    
  //   return this.http
  //     .get(`${environment.BASEURL}/api/user/profile`, this.options)
  //     .map(res => {
       
  //       return res.json()
  //     })
  //      .map(user => {
        
  //      this.user = user
  //       return user
  //     });   
  // }

// getOffers() {
//   return this.http
//   .get(`${environment.BASEURL}/api/offer/`, this.options)
//   .map( res => {

//     return res.json()
//   })
  
// }


}




