import { Component } from '@angular/core';
import {UserInfoLogin} from "../login/user-info-login";
import {UserInfoRegister} from "./user-info-register";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/authservice";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  userInfoRegister: UserInfoRegister = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(private router: Router,
              private authService: AuthService) { }

  submit(){
    // this.authService.register(this.userInfoRegister).subscribe({
    //   next: value => {
    //     this.authService.setToken(value.token);
    //     this.router.navigate(['/verification'])
    //   }
    // })
    this.authService.register(this.userInfoRegister).subscribe(
      (value) => {
        this.authService.setToken(value.token);
        this.router.navigate(['/verification']);
      },
      (error) => {
        console.error('Registration Error:', error);
        // Дополнительная логика обработки ошибки
      }
    );
  }
}
