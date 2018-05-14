import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  user:any;
  title: string = 'Your ubication';
  lat: number = 40.433489;
  lng: number = -3.698555;
  zoom: number = 15;

  constructor(public router: Router, public sessionService: SessionService) { }

  ngOnInit() {

    
  
  }

}
