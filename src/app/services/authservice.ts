import {Inject, inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserInfoRegister} from "../registration/user-info-register";
import {environment} from "../../environments/environment";
import {ValidationData} from "../verification/validationData";
import {UserInfo} from "../user-info";
import { Router } from '@angular/router';

const TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) { }
  private redirectUrl: string | null = null;

  setRedirectUrl(url: string): void {
    localStorage.setItem('redirectUrl', url);
  }

  getRedirectUrl(): string | null {
    return localStorage.getItem('redirectUrl');
  }

  clearRedirectUrl(): void {
    localStorage.removeItem('redirectUrl');
  }


  private username: string = '';

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }



  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(payload: {username: string, password: string}) {
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/authenticate`, payload).pipe(
      tap(() => {
        this.setIsAuthenticated(true);
        const redirectUrl = this.getRedirectUrl();
        if (redirectUrl) {
          this.clearRedirectUrl();
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['/home']);
        }
      })

    );
  }


  register(payload: { username: string, password: string, email: string }) {
    return this.httpClient.post(`${this.apiUrl}api/v1/auth/register`, payload, { responseType: 'text' });
  }

  validate(validationData: any) {
    return this.httpClient.post(`${this.apiUrl}api/v1/auth/validate`, validationData, { responseType: 'text' });
  }

  resendVerificationCode() {
    return this.httpClient.post(`${this.apiUrl}api/v1/auth/validate`, { responseType: 'text' });
  }

  getUserByUsername(username: string): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${this.apiUrl}api/v1/users/usernames/${username}`);
  }

  setToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.setIsAuthenticated(false);
    this.router.navigate(['/login']);
  }
}
