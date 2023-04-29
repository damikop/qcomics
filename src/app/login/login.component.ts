import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // username: string;
  // password: string;

  constructor(private router: Router) { }

  onSubmit() {
    // TODO: Implement login logic
    // For now, just navigate to the home page
    this.router.navigate(['/home']);
  }
}
