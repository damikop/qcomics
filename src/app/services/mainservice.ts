import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Comic} from "../comic";
import {environment} from "../../environments/environment";
import {Chapter} from "../Chapter";
import {Mapping} from "../Mapping"
import {imageChapter} from "../imageChapter";
import {Author} from "../Author";


@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // private comicName!: string;
  // setComicName(comicName: string): void {
  //   this.comicName = comicName;
  // }
  // getComicName(): string {
  //   return this.comicName;
  // }
  // private selectedComic: Comic | undefined;
  //
  // setSelectedComic(comic: Comic): void {
  //   this.selectedComic = comic;
  // }
  //
  // getSelectedComic(): string | undefined {
  //   return this.selectedComic?.name;
  // }

  getComics(): Observable<Comic[]> {
    return this.httpClient.get<Comic[]>(`${this.apiUrl}api/v1/comics/all`);
  }

  getComicDetails(name: string): Observable<Comic> {
    return this.httpClient.get<Comic>(`${this.apiUrl}api/v1/comics/${name}`);
  }

  getChapters(comicName: string): Observable<Chapter[]> {
    return this.httpClient.get<Chapter[]>(`${this.apiUrl}api/v1/chapters/comic-names/${comicName}`);
  }

  postComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comics/save`, comic)
      // .pipe(
      //   tap((uploadedComic: Comic) => {
      //     this.uploadedComic = uploadedComic;
      //   })
      // );
  }

  updateComic(comic: Comic): Observable<Comic> {
    return this.httpClient.post<Comic>(`${this.apiUrl}api/v1/comics/update`, comic);
  }

  deleteComic(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}api/v1/comics/${name}`);
  }

  getImages(chapterName: string, comicName: string): Observable<imageChapter[]> {
    return this.httpClient.get<imageChapter[]>(`${this.apiUrl}api/v1/images/all?chapterName=${chapterName}&comicName=${comicName}`);
  }

  saveChapterByName(chapter: Chapter): Observable<Chapter> {
    return this.httpClient.post<Chapter>(`${this.apiUrl}api/v1/chapters/save-by-name`, chapter);
  }
  saveImage(imageChapter:imageChapter): Observable<imageChapter> {
    return this.httpClient.post<imageChapter>(`${this.apiUrl}api/v1/images/save`, imageChapter);
  }



  mapping(map: Mapping, author: Author): Observable<Comic[]> {
    const queryParams = new URLSearchParams();

    // Set query parameters
    queryParams.set('page', map.page.toString());
    queryParams.set('size', map.size.toString());

    const url = `${this.apiUrl}api/v1/comics/findAll/map?${queryParams.toString()}`;

    const requestBody = {
      author: author.author
    };

    return this.httpClient.post<Comic[]>(url, requestBody);
  }
}
