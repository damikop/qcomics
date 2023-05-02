import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qcomics';

  // showHeader = true;
  //
  // constructor(private router: Router) {}
  //
  // onRegisterClicked() {
  //   // скрыть хедер
  //   this.showHeader = false;
  //   // перейти на страницу регистрации
  //   this.router.navigate(['/registration']);
  //   // this.isRegistrationPage = true;
  // }
}
