import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNotLoggedComponent } from './header-not-logged.component';

describe('HeaderNotLoggedComponent', () => {
  let component: HeaderNotLoggedComponent;
  let fixture: ComponentFixture<HeaderNotLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNotLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNotLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
