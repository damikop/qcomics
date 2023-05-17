import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Comic} from "../home/comic";
import {environment} from "../../environments/environment";
import {Chapter} from "../comic-details/Chapter";

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getComics(): Observable<Comic[]> {
    return this.httpClient.get<Comic[]>(`${this.apiUrl}api/v1/comic/all`);
  }

  getComicDetails(name: string): Observable<Comic> {
    return this.httpClient.get<Comic>(`${this.apiUrl}api/v1/comic/${name}`);
  }

  getChapters(comicName: string): Observable<Chapter[]> {
    return this.httpClient.get<Chapter[]>(`${this.apiUrl}api/v1/chapter/${comicName}`);
  }

  getAllChapters(comicName: string): Observable<Chapter[]> {
    return this.httpClient.get<Chapter[]>(`${this.apiUrl}api/v1/chapter/all`);
  }

  postComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comic/save`, comic);
  }

  updateComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comic/update`, comic);
  }

  deleteComic(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}api/v1/comic/${name}`);
  }

}
