import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoLogin} from "./user-info-login";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/authservice";

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

  constructor(private authService: AuthService,
              private router: Router){}
  ngOnInit(): void {
  }

  submit(){
    this.authService.login(this.payload).subscribe({
      next: value => {
        this.authService.setToken(value.token);
        this.router.navigate(['/home/'])
      }
    })
  }

}
