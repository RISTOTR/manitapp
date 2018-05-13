import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

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
