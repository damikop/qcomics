import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../services/mainservice";
import {Comic} from "../comic";
import {Chapter} from "../Chapter";
import {GenreTranslateService} from "../genre-translate.pipe";

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit {

  comic!: Comic;
  chapters!: Chapter[];


  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private genreTranslateService: GenreTranslateService
  ) { }
  ngOnInit() {
    const comicName = this.route.snapshot.paramMap.get('name');
    console.log(comicName)
    if (comicName){
      this.getComicDetails(comicName);
      this.getChapters(comicName);
    }
  }

  getComicDetails(name: string): void {
    this.mainService.getComicDetails(name)
      .subscribe(comic => {
        this.comic = comic;
      });
  }

  getChapters(comicName: string): void {
    this.mainService.getChapters(comicName).subscribe(chapters => {
      this.chapters = chapters;
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



