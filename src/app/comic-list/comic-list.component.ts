import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/mainservice';
import { Comic } from '../comic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css']
})
export class ComicListComponent implements OnInit {
  comics: Comic[] = [];

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.loadComics();
  }

  loadComics(): void {
    this.mainService.getComics().subscribe(
      (comics: Comic[]) => {
        this.comics = comics;
      },
      (error) => {
        console.error('Произошла ошибка при загрузке комиксов:', error);
      }
    );
  }

  addChapter(comicName: string): void {
    // this.mainService.setComicName(comicName);
    this.router.navigate(['/publishingChapter']);
  }
}


