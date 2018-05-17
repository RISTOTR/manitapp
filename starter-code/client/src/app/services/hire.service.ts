import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";

import { Hire } from "../interfaces/hire-interface";

@Injectable()
export class HireService {
    options: any = { withCredentials: true };

constructor(private http: Http) { }

// addHire(hire){
//     return this.http.post(`${environment.BASEURL}/api/hire/${hire.offerID}`, hire, { withCredentials: true })
//     .map((res) => { return res.json()});
    
// }

createHire(info, idOffer) {
    console.log(info,idOffer)
    return this.http
      .post(`${environment.BASEURL}/api/hire/new/${idOffer}`, info, this.options)
      .map(res => {
            console.log(res)
            return res.json()
        });
  }

  getHire() {
    return this.http
      .get(`${environment.BASEURL}/api/hire/`, this.options)
      .map(res => res.json());
  }



}





