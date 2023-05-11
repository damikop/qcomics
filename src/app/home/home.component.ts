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

  ngOnInit(): void{
    this.mainService.getComics().subscribe(comics => {
        // this.comics = comics;
        console.log(comics)
      }
    );
  }
}
