import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { User } from "../interfaces/user-interface";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:User;
  // title: string = 'Your ubication';
  // lat: number = 40.433489;
  // lng: number = -3.698555;
  // zoom: number = 15;

  constructor(public sessionService: SessionService, public userService: UserService) { }

  ngOnInit() {
    
  }


}
