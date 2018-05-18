import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { UserService } from "../services/user.service";
import { Hire } from "../interfaces/hire-interface";
import { OfferService } from "../services/offer.service";
import { HireService } from "../services/hire.service";

@Component({
  selector: 'app-hireList',
  templateUrl: './hireList.component.html',
  styleUrls: ['./hireList.component.scss']
})
export class HireListComponent implements OnInit {
  hires:any;
  user: User;
  currentUser: User;


  constructor(
    public sessionService: SessionService,
    public offerService: OfferService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    public hireService: HireService
  ) { }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(u => {
      this.currentUser = u});
      this.hireService.getHires().subscribe(data => (this.hires=data))

      }

}
