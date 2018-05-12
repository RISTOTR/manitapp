import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../Interfaces/user-interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(public router: Router, public userService: UserService, public sessionService: SessionService) { }

  ngOnInit() {
  }

}
