import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private user: UserService,
  ) { }

  ngOnInit() {
  }
  async autenticar(){
    await this.user.autenticate().subscribe(data => {
      console.log(data);
    })
  }
}
