import {Inject, inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserInfoRegister} from "../registration/user-info-register";
import {environment} from "../../environments/environment";

const TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  login(payload: {username: string, password: string}){
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/authenticate`, payload)
  }

  register(payload: {username: string, password: string, email: string}){
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/register`, payload)
  }

  setToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }

}
