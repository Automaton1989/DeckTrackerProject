import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckAccountPageComponent } from './deck-account-page.component';

describe('DeckAccountPageComponent', () => {
  let component: DeckAccountPageComponent;
  let fixture: ComponentFixture<DeckAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
