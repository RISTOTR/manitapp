import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { OfferService } from "../services/offer.service";
import { UserService } from "../services/user.service";
import { Offer } from "../interfaces/offer-interface";
import * as _ from 'lodash'

@Component({
  selector: "app-offer",
  templateUrl: "./offer.component.html",
  styleUrls: ["./offer.component.scss"]
})
export class OfferComponent implements OnInit {
  user: User;
  offer: Offer;
  offers: any;
  myPosition: any;
  markers: Array<any> = [];
  currentUser: User;
  title: string = "Your ubication";
  lat: number;
  lng: number;
  zoom: number = 15;

  searchTerm: string;

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

  constructor(
    public router: Router,
    public sessionService: SessionService,
    public offerService: OfferService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.findMe();
    this.sessionService.isLoggedIn().subscribe(u => (this.currentUser = u));
    
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.myPosition = {
          type: "Point",
          coordinates: [this.lng, this.lat]
        };

        let myPosition2 = {
          type: "Point",
          coordinates: [this.lat, this.lng]
        };

        this.offerService.getList(myPosition2).subscribe(offers => {
          this.offers = offers;
          offers.forEach(e => {
            this.lat = e.location.coordinates[0];
            this.lng = e.location.coordinates[1];
            this.markers.push({
              lat: e.location.coordinates[0],
              lng: e.location.coordinates[1]
            });
          });
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getListByPro() {
    this.offerService.getListByPro(this.searchTerm, this.myPosition).subscribe(offers  => {
      this.offers = offers;
      
      let locations =  _.mapValues(this.offers, 'location.coordinates')
      this.markers = _.values(locations).map(coord=>JSON.parse(`{"lat":${coord[0]},"lng":${coord[1]}}`))
    })
  }


  






}
