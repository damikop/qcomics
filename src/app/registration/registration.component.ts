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
  registrationStatus: string = '';
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router,
              private authService: AuthService) { }

  submit(){
    this.authService.register(this.userInfoRegister).subscribe(
      (value) => {
        // this.authService.setToken(value.token);
        // После успешной регистрации отобразить модальное окно
        this.showVerificationModal = true;
        this.authService.setIsAuthenticated(true);
        this.authService.setUsername(this.userInfoRegister.username);
        this.emailSent = true;
      },
      (error) => {
        console.error('Ошибка регистрации:', error);
        // Добавьте обработку ошибки регистрации, если требуется
      }
      );
  }

  submitCode() {
    const validationData: ValidationData = {
      verificationCode: this.verificationCode
    };
    this.authService.validate(validationData).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Ошибка валидации:', error);
        this.errorMessage = 'Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.';
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
