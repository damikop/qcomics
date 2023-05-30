import {Component, OnInit} from '@angular/core';
import {MainService} from "../services/mainservice";
import {ActivatedRoute} from "@angular/router";
import {Chapter} from "../Chapter";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit{
  chapter!: Chapter;
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit() {
    const comicName = this.route.snapshot.paramMap.get('name');
    const chapterName = this.route.snapshot.paramMap.get('chapterName');
    if (comicName && chapterName) {
      this.getImages(comicName, chapterName);
    }
  }

  getChapterDetails(comicName: string, chapterName: string): void {
    this.mainService.getChapters(comicName).subscribe(chapters => {
      this.chapter = chapters.find(chapter => chapter.name === chapterName)!;
    });
  }

  getChapterImageURL(base64: string): string {
    return 'data:image/jpeg;base64,' + base64;
  }

  getImages(comicName: string, chapterName: string): void {
    this.mainService.getImages(comicName, chapterName)
      .subscribe(images => {
        this.images = images;
      });
  }
}
