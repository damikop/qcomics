import {Inject, inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserInfoRegister} from "../registration/user-info-register";
import {API_URL} from "./api.service";

const TOKEN_KEY = 'token-key'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, @Inject(API_URL) private apiUrl: string) { }
  login(payload: {username: string, password: string}){
    return this.httpClient.post<{token: string}>(`${this.apiUrl}api/v1/auth/authenticate`, payload)
  }

  setToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }

}
