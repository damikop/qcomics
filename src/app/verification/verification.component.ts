import { Component } from '@angular/core';
import {AuthService} from "../services/authservice";
import {Router} from "@angular/router";
import {ValidationData} from "./validationData";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationCode: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
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
