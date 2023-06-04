import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comic} from "../comic";
import {MainService} from "../services/mainservice";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../services/authservice";

@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.css']
})
export class PublishingComponent {
  // comic: Comic = {} as Comic;
  selectedGenre: string = '';
  selectedGenres: string[] = [];
  url="./assets/images/cover.png";
  title: string = '';
  summary: string = '';


  comic: Comic = {
    name: this.title,
    genres: this.selectedGenres,
    author: '',
    imageCoverBase64: this.url,
    rating: 0,
    votes: 0,
    description: this.summary,
    type: 'AUTHOR',
    publishedDate: '2023-05-17',
    isUpdated: false
  };


  handleFileInput(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        const base64String = this.url.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        this.comic.imageCoverBase64 = base64String;
      };
    }
  }

  constructor(private httpClient: HttpClient,
              private mainService: MainService,
              private router: Router,
              private authService: AuthService) {}

  publishComic(): void {
    const author = this.authService.getUsername();
    this.comic.author = author;
    this.comic.name = this.title;
    this.comic.description = this.summary;
    const currentDate = new Date();
    this.comic.publishedDate = formatDate(currentDate, 'dd.MM.yyyy', 'en-US');
    this.mainService.postComic(this.comic).subscribe(response => {
      const comicName = response.name;
      this.router.navigate(['/publishingChapter', this.comic.name], { queryParams: { comicName: comicName } });
      console.log('Комикс успешно отправлен на сервер:', response);
    }, error => {
      console.error('Произошла ошибка при отправке комикса:', error);
    });
  }

  addGenre() {
    if (this.selectedGenre && this.selectedGenres.length < 3 && !this.selectedGenres.includes(this.selectedGenre)) {
      this.selectedGenres.push(this.selectedGenre);
      this.selectedGenre = '';
    }
  }

  removeGenre(index: number): void {
    this.selectedGenres.splice(index, 1);
  }

}


// handleDragOver(event: any) {
//   event.preventDefault();
// }
//
// handleDrop(event: any) {
//   event.preventDefault();
//   const file = event.dataTransfer.files[0];
// }
