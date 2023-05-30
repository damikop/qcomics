import {Inject, inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserInfoRegister} from "../registration/user-info-register";
import {environment} from "../../environments/environment";
import {ValidationData} from "../verification/validationData";

const TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(payload: {username: string, password: string}){
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/authenticate`, payload)
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

  setToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }

}
