import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/authservice";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Chapter} from "../Chapter";
import {MainService} from "../services/mainservice";

@Component({
  selector: 'app-header-not-logged',
  templateUrl: './header-not-logged.component.html',
  styleUrls: ['./header-not-logged.component.css']
})
export class HeaderNotLoggedComponent implements OnInit{
  isAuthenticated: boolean = false;
  isChapterPage = false;
  chapterNumber!: string | null;
  selectedChapter: Chapter | null = null;
  showChapterNavigation = false;
  chapters: Chapter[] = []; // Добавленное поле chapters


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private mainService: MainService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isChapterPage = this.router.url.includes('/chapter');
        // this.chapterNumber = this.route.snapshot.paramMap.get('id');
      }
    });

    const chapterName = this.route.snapshot.paramMap.get('chapterName');
    if (chapterName) {
      this.showChapterNavigation = true;
      const comicName = this.route.snapshot.paramMap.get('name');
      if (comicName) {
        this.mainService.getChapters(comicName).subscribe((chapters: Chapter[]) => {
          const foundChapter = chapters.find(chapter => chapter.name === chapterName);
          this.selectedChapter = foundChapter !== undefined ? foundChapter : null;
        });
      }
    }
  }

  goToPreviousChapter(): void {
    // Обработка перехода на предыдущую главу
  }

  goToNextChapter(): void {
    // Обработка перехода на следующую главу
  }

}
