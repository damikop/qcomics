import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/authservice";

@Component({
  selector: 'app-header-not-logged',
  templateUrl: './header-not-logged.component.html',
  styleUrls: ['./header-not-logged.component.css']
})
export class HeaderNotLoggedComponent implements OnInit{
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
