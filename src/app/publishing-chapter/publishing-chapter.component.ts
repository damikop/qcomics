import { Component, OnInit } from '@angular/core';
import { MainService } from "../services/mainservice";
import { ActivatedRoute } from "@angular/router";
import { Comic } from "../comic";
import { imageChapter } from "../imageChapter";
import { Chapter } from "../Chapter";
import { v4 as uuidv4 } from 'uuid';
import {mergeMap, Observable, switchMap} from "rxjs";

class CustomFile {
  constructor(public file: File, public url: string) {}
}

@Component({
  selector: 'app-publishing-chapter',
  templateUrl: './publishing-chapter.component.html',
  styleUrls: ['./publishing-chapter.component.css']
})
export class PublishingChapterComponent {
  comicName: string = '';
  chapterName: string = '';
  selectedFiles: CustomFile[] = [];
  // chapter!: Chapter;
  url = "";
  previewUrls: string[] = [];

  chapter: Chapter = {
    name: this.chapterName,
    comicName: this.comicName
  }
  imageChapter: imageChapter = {
    chapterName: this.chapterName,
    comicName: this.comicName,
    base64: this.url
  }

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.comicName = params['comicName'];
    });
  }

  handleFileInput(event: any) {

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        const base64String = this.url.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        this.imageChapter.base64 = base64String;
        this.previewUrls.push(this.url);

      };
    }
  }


  publishChapter(): void {
    const chapter: Chapter = {
      name: this.chapterName,
      comicName: this.comicName};

    this.mainService.saveChapterByName(chapter).subscribe(savedChapter => {
      console.log('before save chapter')
      this.saveChapterImages().subscribe(() => {
        console.log('Изображения главы успешно сохранены');
      }, error => {
        console.error('Произошла ошибка при сохранении изображений главы:', error);
      });
    }, error => {
      console.error('Произошла ошибка при сохранении главы:', error);
    });

  }

saveChapterImages(): Observable<any> {
  console.log("внутри чаптер")
  return new Observable<any>(observer => {
    const fileCount = this.selectedFiles.length;
    let savedCount = 0;


        const imageChapter: imageChapter = {
          chapterName: this.chapterName,
          comicName: this.comicName,
          base64: this.url
        };

        this.mainService.saveImage(imageChapter).subscribe(savedChapter => {
          console.log('Изображение главы успешно сохранено:', savedChapter);
          savedCount++;

          if (savedCount === fileCount) {
            observer.next(); // Завершение Observable после сохранения всех изображений
            observer.complete();
          }
        }, (error: any) => {
          console.error('Произошла ошибка при сохранении изображения главы:', error);
          observer.error(error);
        });
      });




}



previewImages() {
    this.previewUrls = this.selectedFiles.map(file => file.url);


  }
}


// publishChapter() {
//   console.log('Название главы:', this.chapterName);
//   console.log('Выбранные файлы:', this.selectedFiles);
//
//   // Вместо вызова фактического сохранения на бэкэнд, просто выводим данные в консоль
//   for (let i = 0; i < this.selectedFiles.length; i++) {
//     console.log('Сохранение изображения:', this.selectedFiles[i].url);
//   }
//
//   console.log('Глава успешно сохранена');
// }
