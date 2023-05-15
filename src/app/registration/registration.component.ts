import { Component } from '@angular/core';
import {UserInfoLogin} from "../login/user-info-login";
import {UserInfoRegister} from "./user-info-register";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/authservice";
import {ValidationData} from "../verification/validationData";

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
  showVerificationModal: boolean = false;
  verificationCode: string = '';


  constructor(private router: Router,
              private authService: AuthService) { }

  submit(){
    this.authService.register(this.userInfoRegister).subscribe(
      (value) => {
        this.authService.setToken(value.token);
        // После успешной регистрации отобразить модальное окно
        this.showVerificationModal = true;
      }
      );
    // this.authService.register(this.userInfoRegister).subscribe(
    //   (value) => {
    //     this.authService.setToken(value.token);
    //     this.router.navigate(['/verification']);
    //   }
    // );
  }

  submitCode() {
    const validationData: ValidationData = {
      verificationCode: this.verificationCode
    };

    this.authService.validate(validationData).subscribe(
      (response) => {
        // Валидация прошла успешно
        // Выполните действия, необходимые после успешной валидации
        // Например, перенаправление на главную страницу
        this.router.navigate(['/home']);
      },
      (error) => {
        // Валидация не удалась
        // Обработайте ошибку в соответствии с вашими требованиями
        console.error('Ошибка валидации:', error);
      }
    );
  }

  resendCode() {
    // Обработка повторной отправки кода
    this.authService.resendVerificationCode().subscribe(
      (response) => {
        // Код успешно отправлен повторно
        console.log('Код подтверждения отправлен повторно.');
      },
      (error) => {
        // Ошибка при отправке кода
        console.error('Ошибка при повторной отправке кода:', error);
      }
    );
  }
}
