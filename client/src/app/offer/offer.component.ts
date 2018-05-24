import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { OfferService } from "../services/offer.service";
import { UserService } from "../services/user.service";
import { Offer } from "../interfaces/offer-interface";
import * as _ from 'lodash';
import { locateHostElement } from "@angular/core/src/render3/instructions";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


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
  bol: Boolean = false;
  searchTerm: string;

  

  constructor(
    public router: Router,
    public sessionService: SessionService,
    public offerService: OfferService,
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.bol = true;
    this.findMe();
    this.sessionService.isLoggedIn().subscribe(u => {
      (this.currentUser = u)
      console.log("PRUEBA")
    });
    
    this.offerService
   
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
          console.log(this.offers instanceof Object)
          console.log(Array.isArray(this.offers))
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
    this.bol = false;
    this.offerService.getListByPro(this.searchTerm, this.myPosition).subscribe(offers  => {
      this.offers = offers;
      let locations =  _.mapValues(this.offers, 'location.coordinates')
      this.markers = []
      _.values(locations).map(coord=>{
        console.log(coord)
        
        this.markers.push(JSON.parse(`{"lat":${coord[0]},"lng":${coord[1]}}`))
        //this.bol = true;
        //this.findMe()
        setTimeout(function(){ 
          console.log(this.markers)
          this.bol = true; 
          console.log("SETTIME")
        }.bind(this), 1000);
      })
      console.log("---------------",this.markers)
    })
  }


  






}
