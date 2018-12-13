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
  // fullImagePath: string;
  user:User;
  
  currentUser:User;
  

  constructor(public sessionService: SessionService, public userService: UserService) {
    // this.fullImagePath = '../../assets/images/firstpage.jpg'
   }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(u => {
      this.currentUser = u});
  }


}
