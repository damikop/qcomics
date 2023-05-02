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

  // onSubmit(form: NgForm) {
  //   console.log(form.value)
  //   // this.router.navigate(['/home']);
  // }

  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     this.authService.registerUser(this.userInfoRegister)
  //       .subscribe(
  //         response => {
  //           console.log(response); // обработка успешного ответа от сервера
  //         },
  //         error => {
  //           console.error(error); // обработка ошибки
  //         }
  //       );
  //   }
  // }

  // register(){
  //   this.authService.registerUser(this.userInfoRegister.username, this.userInfoRegister.email, this.userInfoRegister.password).subscribe((result)=>{
  //     console.log(result);
  //   })
  // }
}
