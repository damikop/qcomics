
import { Component, OnInit } from '@angular/core';
import { MainService } from "../services/mainservice";
import { ActivatedRoute } from "@angular/router";
import { Chapter } from "../Chapter";
import {imageChapter} from "../imageChapter";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  chapter: Chapter[]=[];
  images: imageChapter[] = [];

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    const comicName = this.route.snapshot.paramMap.get('name')!;
    const chapterName = this.route.snapshot.paramMap.get('chapterName')!;
    console.log(chapterName);
    console.log(comicName);

    if (chapterName && comicName) {
      this.mainService.getImages(chapterName, comicName).subscribe(images => {
        this.images = images;
        console.log(images);
      });
    }
  }

  getChapterImageURL(base64: string): string {
    return 'data:image/jpeg;base64,' + base64;
  }


  // getImages(comicName: string, chapterName: string): void {
  //   this.mainService.getImages(comicName, chapterName).subscribe(chapter => {
  //     this.chapter = chapter;
  //     // Продолжайте получение данных о изображениях после получения данных о главе
  //     this.mainService.getImages(comicName, chapterName).subscribe(images => {
  //       this.images = images;
  //       console.log(images);
  //     });
  //   });
  // }

}
