import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { UserService } from "../services/user.service";
import { Hire } from "../interfaces/hire-interface";
import { OfferService } from "../services/offer.service";
import { HireService } from "../services/hire.service";

@Component({
  selector: "app-hire",
  templateUrl: "./hire.component.html",
  styleUrls: ["./hire.component.scss"]
})
export class HireComponent implements OnInit {
  idOffer: string;
  hire: Hire;
  user: User;
  currentUser: User;

  hireForm = {
    address: "",
    date: "",
    observations: "",
    price: ""
  };

  constructor(
    public sessionService: SessionService,
    public offerService: OfferService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    public hireService: HireService
  ) {}

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(u => {
      this.currentUser = u});
    this.route.params.subscribe(params => {
      console.log(params["id"])
      this.idOffer = String(params["id"]);
    });
  }

  saveHire(hireForm) {
    hireForm.value.user=this.currentUser._id
    this.hireService
      .createHire(hireForm.value, this.idOffer)
      .subscribe(data => {
        this.router.navigate(["/home"]);
      });
  }
}
