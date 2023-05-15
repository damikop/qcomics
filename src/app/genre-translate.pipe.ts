import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreTranslateService {
  private genreTranslations: { [key: string]: string } = {
    action: 'Экшн ',
    comedy: 'Комедия ',
    drama: 'Драма ',
    adventures: 'Приключения ',
    fantastic: 'Фантастика ',
    children: 'Детское ',
    romantic: 'Романтика ',
    daily: 'Повседневность '
  };

  translateGenre(genre: string): string {
    return this.genreTranslations[genre.toLowerCase()] || genre;
  }
}
