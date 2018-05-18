import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../Interfaces/user-interface";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user:User;
  currentUser:User;
  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(u=>this.currentUser=u)
    // this.profile();
  }

  // profile() {
  //   this.userService.profileUser().subscribe(user => {
  //     this.user = user;
  //   });
  // }

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.currentUser = null;
      this.router.navigate(["/home"]);
    });
  }

}
