import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { User } from "../interfaces/user-interface";
import { OfferService } from '../services/offer.service';
import { UserService } from "../services/user.service";
import { Offer } from "../interfaces/offer-interface"


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  user:User;
  offer: Offer
  offers: any;
  markers: Array<any> = [];

  title: string = 'Your ubication';
  lat: number;
  lng: number;
  zoom: number = 15;

  // offer  = {
  //   offerTitle: '',
  //   offerDescription: '',
  //   lat: 40.4167754,
  //   lng: -3.7038123,
  //   unlockDistance: 20,
  // };

  //currentLocation:  {lat:number,lng:number,coordinates:Array<any>}

  
  //postalcode: string;
  // offers: any;
  

  constructor(public router: Router, public sessionService: SessionService, public offerService: OfferService, public userService: UserService) { }

 

  ngOnInit() {
 this.searchOffer();
 this.findMe();
    }

    findMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
 

    searchOffer(){
      this.userService.getOffers().subscribe( offers => {
        this.offers = offers
        offers.forEach(e => {
          this.lat = e.location.coordinates[0];
          this.lng = e.location.coordinates[1];
          console.log(e)
          this.markers.push({lat: e.location.coordinates[0] , lng: e.location.coordinates[1]})
        });
      })
    }

}
