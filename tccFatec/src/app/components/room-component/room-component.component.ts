import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'room',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.scss'],
})
export class RoomComponentComponent implements OnInit {

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {}

  goToCalendar(){
    this.router.navigate(['/admin/calendar-of-events'])
  }
  goToEditRoom(){

  }

}
