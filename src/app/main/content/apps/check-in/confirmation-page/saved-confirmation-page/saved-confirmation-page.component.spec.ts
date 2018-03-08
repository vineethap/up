import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedConfirmationPageComponent } from './saved-confirmation-page.component';

describe('SavedConfirmationPageComponent', () => {
  let component: SavedConfirmationPageComponent;
  let fixture: ComponentFixture<SavedConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedConfirmationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
