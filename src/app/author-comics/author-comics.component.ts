import {Component, OnInit} from '@angular/core';
import {Comic} from "../comic";
import {MainService} from "../services/mainservice";
import {GenreTranslateService} from "../genre-translate.pipe";

@Component({
  selector: 'app-author-comics',
  templateUrl: './author-comics.component.html',
  styleUrls: ['./author-comics.component.css']
})
export class AuthorComicsComponent implements OnInit{
  comics: Comic[] = [];

  constructor(private mainService: MainService, private genreTranslateService: GenreTranslateService) { }

  ngOnInit(): void {
    this.mainService.getComics().subscribe(comics => {
      this.comics = comics.filter(comic => comic.type === 'AUTHOR');
      console.log(this.comics);
    });
  }

  getComicImageURL(imageCoverBase64: string): string {
    // Преобразование base64-кода в URL изображения
    return 'data:image/jpeg;base64,' + imageCoverBase64;
  }

  translateGenre(genre: string): string {
    return this.genreTranslateService.translateGenre(genre); // Используйте метод translateGenre из сервиса перевода жанров
  }
}
