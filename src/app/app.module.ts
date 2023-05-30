import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudioComicsComponent } from './studio-comics/studio-comics.component';
import { AuthorComicsComponent } from './author-comics/author-comics.component';
import { PublishingComponent } from './publishing/publishing.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from "@angular/common/http";

import { HeaderNotLoggedComponent } from './header-not-logged/header-not-logged.component';
import { UniqueUsernameDirective } from './registration/unique-username.directive';
import { VerificationComponent } from './verification/verification.component';
import {GenreTranslateService} from "./genre-translate.pipe";
import { ComicDetailsComponent } from './comic-details/comic-details.component';
import { ChapterComponent } from './chapter/chapter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudioComicsComponent,
    AuthorComicsComponent,
    PublishingComponent,
    SearchResultComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderNotLoggedComponent,
    UniqueUsernameDirective,
    VerificationComponent,
    ComicDetailsComponent,
    ChapterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [GenreTranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
