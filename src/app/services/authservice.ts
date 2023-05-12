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
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/authenticate`, payload).pipe(
      catchError(this.handleError));
  }

  register(payload: {username: string, password: string, email: string}){
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/register`, payload).pipe(
      catchError(this.handleError));
  }

  validate(data: ValidationData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}api/v1/auth/validate`, data).pipe(
      catchError(this.handleError));
  }

  resendVerificationCode(): Observable<any> {
    const url = `${this.apiUrl}api/v1/auth/validate`;
    return this.httpClient.post<any>(url, {});
  }

  setToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = error.error.message;
    } else {
      // Ошибка на стороне сервера
      errorMessage = error.error.message || errorMessage;
    }

    // Здесь вы можете выполнить необходимую обработку ошибки,
    // например, отображение сообщения об ошибке или запись в журнал ошибок

    console.error('HTTP Error:', error.status);
    console.error('Error Message:', errorMessage);

    return throwError(errorMessage);
  }
}
