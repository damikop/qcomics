import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoLogin} from "./user-info-login";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/authservice";

declare var $: any; // Добавьте эту строку для использования jQuery

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  payload = {
    username: '',
    password: ''
  };
  errorMessage = '';
  constructor(private authService: AuthService,
              private router: Router){}
  ngOnInit(): void {
    // $(document).ready(() => {
    //   $('#forgotPasswordModal').modal();
    // });
  }

  // openForgotPasswordModal(): void {
  //   // Открываем модальное окно
  //   $('#forgotPasswordModal').modal('open');
  // }
  //
  // closeForgotPasswordModal(): void {
  //   // Закрываем модальное окно
  //   $('#forgotPasswordModal').modal('close');
  // }

  submit(form: NgForm) {
    this.authService.setRedirectUrl('/publishing');
    this.authService.login(this.payload).subscribe({
      next: value => {
        this.authService.setToken(value.token);
        this.authService.setIsAuthenticated(true);
        this.authService.setUsername(this.payload.username);
        this.router.navigate(['/home/']);
      },
      error: error => {
        if (error.status === 500) {
          this.errorMessage = 'Неверный логин или пароль';
          form.resetForm();
        }
      }
    });
  }
}
