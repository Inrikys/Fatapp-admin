import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-of-events',
  templateUrl: './calendar-of-events.page.html',
  styleUrls: ['./calendar-of-events.page.scss'],
})
export class CalendarOfEventsPage implements OnInit {

  constructor(
    private global: GlobalsService,
  ) { }

  ngOnInit() {
  }

  async goToQrCode(id) {
    try {
        this.global.navigateByUrl('admin/qr-code?id=' + id);
    } catch (error) {
      console.log(error);
    }
  }
}
