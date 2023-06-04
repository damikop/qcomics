import {Component, OnInit} from '@angular/core';
import {Comic} from "../comic";
import {Router} from "@angular/router";
import {MainService} from "../services/mainservice";
import {AuthService} from "../services/authservice";
import {UserInfo} from "../user-info";
import {Mapping} from "../Mapping";
import {Author} from "../Author";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  comics: Comic[] = [];

  author: Author = {
    author: ''
  };

  map: Mapping = {
    page: 0,
    size: 100
}


  constructor(private mainService: MainService, private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const author = this.authService.getUsername();
    this.author = {
      author: author
    };
    this.mainService.mapping(this.map, this.author).subscribe(comics => {
      this.comics = comics;
      console.log(comics);
    });
  }

  addChapter(comic: Comic): void {
    // Перейти на страницу добавления главы для выбранного комикса
    this.router.navigate(['/add-chapter', comic.name]);
  }
}
