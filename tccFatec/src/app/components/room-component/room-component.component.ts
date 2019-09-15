import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'room',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.scss'],
})
export class RoomComponentComponent implements OnInit {

  constructor(
    private router: Router,
    private global: GlobalsService,
  ) { }

  ngOnInit() { }

  goToCalendar() {
    this.router.navigate(['/admin/calendar-of-events']);
  }
  goToEditRoom(id) {
    this.global.navigateByUrl('/admin/edit-room?id=' + id);
  }

}
