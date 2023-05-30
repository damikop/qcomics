import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Comic} from "../comic";
import {environment} from "../../environments/environment";
import {Chapter} from "../Chapter";

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getComics(): Observable<Comic[]> {
    return this.httpClient.get<Comic[]>(`${this.apiUrl}api/v1/comics/all`);
  }

  getComicDetails(name: string): Observable<Comic> {
    return this.httpClient.get<Comic>(`${this.apiUrl}api/v1/comics/${name}`);
  }

  getChapters(comicName: string): Observable<Chapter[]> {
    return this.httpClient.get<Chapter[]>(`${this.apiUrl}api/v1/chapters/comic-names/${comicName}`);
  }

  getAllChapters(comicName: string): Observable<Chapter[]> {
    return this.httpClient.get<Chapter[]>(`${this.apiUrl}api/v1/chapters/all`);
  }

  postComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comics/save`, comic);
  }

  updateComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comics/update`, comic);
  }

  deleteComic(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}api/v1/comics/${name}`);
  }

  getImages(comicName: string, chapterName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}api/v1/images/all?comicName=${comicName}&chapterName=${chapterName}`);
  }


}
