import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {

  public headerTitle = '';

  constructor(
      private router: Router,
  ) { }
  ngOnInit() {}

  @Input() set title (val: string){
    this.headerTitle = (val !== undefined && val !== null)? val : null;
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
