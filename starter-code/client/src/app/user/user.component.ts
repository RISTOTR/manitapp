import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
//import { User } from '../Interfaces/user-interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;

  constructor(public router: Router, public sessionService: SessionService, public userService: UserService) { }

  ngOnInit() {
    
    }

    profile() {
      this.userService.profileUser().subscribe(user => {
        this.user = user;
        this.router.navigate(["/profile"]);
      });
    }
    edit() {
          this.router.navigate(["/edit"])
    }
    delete() {
      this.userService
        .deleteUser()
        .subscribe(() => this.router.navigate(["/home"]));
    }

}
