import {Component, OnInit} from '@angular/core';
import { MainService} from "../services/mainservice";
import {Comic} from "../comic";
import {GenreTranslateService} from "../genre-translate.pipe";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  comics: Comic[] = [];

  constructor(private mainService: MainService, private genreTranslateService: GenreTranslateService) { }

  ngOnInit(): void {
    this.mainService.getComics().subscribe(comics => {
      this.comics = comics;
      console.log(comics);
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
