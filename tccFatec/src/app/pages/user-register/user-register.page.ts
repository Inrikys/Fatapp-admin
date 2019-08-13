import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/api/user.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      last_name: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      user_type: this.formBuilder.control('', Validators.required),
      cpf: this.formBuilder.control('', Validators.required),
    })
  }

  async register() {
    const data = {
      name: this.registerForm.get('name').value,
      last_name: this.registerForm.get('last_name').value,
      user_type: this.registerForm.get('user_type').value,
      cpf: this.registerForm.get('cpf').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      rg: '123123127',
    };

    console.log(data);
    this.userService.register(data);
  }

}
