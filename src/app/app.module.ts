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

import { HeaderLoggedComponent } from './header-logged/header-logged.component';
import { HeaderNotLoggedComponent } from './header-not-logged/header-not-logged.component';
import { UniqueUsernameDirective } from './registration/unique-username.directive';

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
    HeaderLoggedComponent,
    HeaderNotLoggedComponent,
    UniqueUsernameDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
