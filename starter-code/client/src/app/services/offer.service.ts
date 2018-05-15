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

 
getList(currentLocation) {
  return this.http.post(`${environment.BASEURL}/api/offer/near`, {currentLocation}, this.options)
      .map(res => {
        console.log(res)  
        return res.json()
      });
  }

   //show professional´s offer
  showOneOffer(id) {
    return this.http
      .get(`${environment.BASEURL}/api/offer/detail/${id}`, this.options)
      .map(res => res.json());
  }

  newOffer(offer) {
    return this.http.post(`${environment.BASEURL}/api/offer/new`, offer, this.options)
      .map(res => {
        console.log(res)  
        return res.json()
      });
  }

  //show professional´s offer
  listOffer() {
    return this.http
      .get(`${environment.BASEURL}/api/offer/offers`, this.options)
      .map(res => res.json());
  }

  //Edit hire
  editOffer(id) {
    return this.http
      .get(`${environment.BASEURL}/api/offer/edit/${id}`)
      .map(res => res.json());
  }

  //Delete hire
  deleteOffer(iOffer) {
    return this.http
      .get(`${environment.BASEURL}/api/offer/delete/${iOffer}`)
      .map(res => res.json());
  }



  getOffers() {
    return this.http
    .get(`${environment.BASEURL}/api/offer/`, this.options)
    .map( res => {
  
      return res.json()
    })



}


