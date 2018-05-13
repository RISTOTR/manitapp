import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = 'Your ubication';
  lat: number = 40.433489;
  lng: number = -3.698555;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
  }

}
