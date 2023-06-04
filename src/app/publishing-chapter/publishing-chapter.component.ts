import { Component, OnInit } from '@angular/core';
import { MainService } from "../services/mainservice";
import { ActivatedRoute } from "@angular/router";
import { Comic } from "../comic";
import { imageChapter } from "../imageChapter";
import { Chapter } from "../Chapter";
import { v4 as uuidv4 } from 'uuid';

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
  chapter!: Chapter;

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.comicName = params['comicName'];
    });
  }
  // ngOnInit() {
  //   this.activatedRoute.ParamMap.subscribe(params => {
  //     const comicName = params.get('comicName');
  //
  //     this.mainService.setComicName(comicName);
  //   });
  // }

  handleFileInput(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        const customFile = new CustomFile(file, base64Image);
        this.selectedFiles.push(customFile);
        this.selectedFiles = [...this.selectedFiles];
      };

      reader.readAsDataURL(file);
    }
  }

  publishChapter(): void {
    const chapter: Chapter = {
      name: this.chapterName,
      comicName: this.comicName
    };

    this.mainService.saveChapterByName(chapter).subscribe(savedChapter => {
      this.saveChapterImages(savedChapter.comicName);
    }, error => {
      console.error('Произошла ошибка при сохранении главы:', error);
    });
  }

  saveChapterImages(comicName: string): void {
    for (let file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result;

        const imageChapter: imageChapter = {
          name: this.chapterName,
          comicName: this.comicName,
          base64: base64String
        };

        this.mainService.saveImage(imageChapter).subscribe(savedImageChapter => {
          console.log('Изображение главы успешно сохранено:', savedImageChapter);
        }, error => {
          console.error('Произошла ошибка при сохранении изображения главы:', error);
        });
      };

      reader.readAsDataURL(file.file);
    }
  }
  //
  // publishChapter() {
  //   const selectedComic = this.mainService.getSelectedComic();
  //   if (selectedComic) {
  //     const comicName = selectedComic.name;
  //     const chapter: Chapter = { name: this.chapterName, comicName: comicName };
  //     this.mainService.saveChapterByName(chapter).subscribe(
  //       (response: any) => {
  //         // Обработка успешного ответа
  //         console.log('Глава успешно сохранена');
  //         this.saveImages(response); // Сохраняем изображения после сохранения главы
  //       },
  //       (error: any) => {
  //         // Обработка ошибки
  //         console.error('Ошибка при сохранении главы', error);
  //       }
  //     );
  //   }
  // }

  previewImages() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
    }
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
