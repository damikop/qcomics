import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {StudioComicsComponent} from "./studio-comics/studio-comics.component";
import {AuthorComicsComponent} from "./author-comics/author-comics.component";
import {PublishingComponent} from "./publishing/publishing.component";
import {LoginComponent} from "./login/login.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {RegistrationComponent} from "./registration/registration.component";
import {VerificationComponent} from "./verification/verification.component";
import {ComicDetailsComponent} from "./comic-details/comic-details.component";
import {ChapterComponent} from "./chapter/chapter.component";
import {ProfileComponent} from "./profile/profile.component";
import {BookmarkComponent} from "./bookmark/bookmark.component";
import {PublishingChapterComponent} from "./publishing-chapter/publishing-chapter.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'studio-comics',
    component: StudioComicsComponent
  },
  {
    path: 'author-comics',
    component: AuthorComicsComponent
  },
  {
    path: 'publishing',
    component: PublishingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publishingChapter/:name',
    component: PublishingChapterComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: 'comic/:name',
    component: ComicDetailsComponent
  },
  {
    path: 'comic/:name/chapter/:chapterName',
    component: ChapterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'bookmark',
    component: BookmarkComponent
  }

];
