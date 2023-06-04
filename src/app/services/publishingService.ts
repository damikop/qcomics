// publishing.service.ts

import { Injectable } from '@angular/core';
import { Comic } from '../comic';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {
  private lastPublishedComic: Comic | null = null;

  getLastPublishedComic(): Comic | null {
    return this.lastPublishedComic;
  }

  setLastPublishedComic(comic: Comic): void {
    this.lastPublishedComic = comic;
  }
}
