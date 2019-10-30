import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckHomePageComponent } from './deck-home-page.component';

describe('DeckHomePageComponent', () => {
  let component: DeckHomePageComponent;
  let fixture: ComponentFixture<DeckHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
