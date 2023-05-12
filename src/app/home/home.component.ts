import {Component, OnInit} from '@angular/core';
import { MainService} from "../services/mainservice";
import {Comic} from "./comic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  comics: Comic[] = [];

  constructor(private mainService: MainService) { }

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
}
