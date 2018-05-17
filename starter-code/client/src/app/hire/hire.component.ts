import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../interfaces/user-interface";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent implements OnInit {
  user:any;
  constructor(public sessionService: SessionService) { }

  ngOnInit() {
  }

}
