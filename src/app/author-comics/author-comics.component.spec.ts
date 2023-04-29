import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComicsComponent } from './author-comics.component';

describe('AuthorComicsComponent', () => {
  let component: AuthorComicsComponent;
  let fixture: ComponentFixture<AuthorComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorComicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
