import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { OfferService } from "../services/offer.service";
import { UserService } from "../services/user.service";
import { Offer } from "../interfaces/offer-interface";
import * as _ from "lodash";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.scss"]
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
/*   user: User;
  offers: any;
  name: String;
  offerTitle: String;
  offerDescription;
  String;
  price: String;
  address: String;
 */
  constructor(
    public route: ActivatedRoute,
    public sessionService: SessionService,
    public offerService: OfferService,
  ) {
    this.route.params.subscribe(params => {
      offerService.showOneOffer(params.id).subscribe(offer => {
     
        this.offer = offer;
      });
    });
  }

  ngOnInit() {}
}
