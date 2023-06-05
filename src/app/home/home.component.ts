import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('comicBannerWrapper') comicBannerWrapper!: ElementRef;

  ngOnInit(): void {
    this.mainService.getComics().subscribe(comics => {
      this.comics = comics;
      console.log(comics);

      const bannerWrapperWidth = 184 * this.comics.length;
      this.comicBannerWrapper.nativeElement.style.width = bannerWrapperWidth + 'px';
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
