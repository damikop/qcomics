import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioComicsComponent } from './studio-comics.component';

describe('StudioComicsComponent', () => {
  let component: StudioComicsComponent;
  let fixture: ComponentFixture<StudioComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioComicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
