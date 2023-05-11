import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Comic} from "../home/comic";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient
  // @Inject(API_URL) private apiUrl: string
  ) { }

  getComics(): Observable<Comic[]> {
    return this.httpClient.get<Comic[]>(`${this.apiUrl}api/v1/comic/all`);
  }
}
