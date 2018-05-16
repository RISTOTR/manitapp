import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../Interfaces/user-interface';
import { OfferService } from '../services/offer.service';
import { Offer } from '../interfaces/offer-interface';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {
  offer: Offer;

  constructor(public sessionService: SessionService, 
    public router: Router, 
    public userService: UserService,
    public offerService: OfferService) { }

  ngOnInit() {
  
  }

}
