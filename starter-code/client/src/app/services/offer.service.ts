import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { User } from "../Interfaces/user-interface";
import { Offer } from "../interfaces/offer-interface";

@Injectable()
export class OfferService {
    offer: Offer;
  options: any = { withCredentials: true };

constructor(private http: Http) { }

 
//  getHire() {
//     return this.http
//       .get(`${environment.BASEURL}/api/hire/get-hire`, this.options)
//       .map(res => res.json());
//   }

  
  newOffer(offer) {
    return this.http.post(`${environment.BASEURL}/api/offer/new`, offer, this.options)
      .map(res => res.json());
  }

  //show professional´s offer
  listOffer() {
    return this.http
      .get(`${environment.BASEURL}/api/offer/offers`, this.options)
      .map(res => res.json());
  }

  //Edit hire
  editOffer() {
    return this.http
      .get(`${environment.BASEURL}/api/offer/edit`)
      .map(res => res.json());
  }

  //Delete hire
  deleteOffer(iOffer) {
    return this.http
      .get(`${environment.BASEURL}/api/offer/delete/${iOffer}`)
      .map(res => res.json());
  }



  getList(currentLocation) {
    return this.http.post(`${environment.BASEURL}/api/offer/near/2000`,{currentLocation})
      .map((res) => res.json());
    }


}


