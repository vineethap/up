import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapConfirmationPageComponent } from './recap-confirmation-page.component';

describe('RecapConfirmationPageComponent', () => {
  let component: RecapConfirmationPageComponent;
  let fixture: ComponentFixture<RecapConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapConfirmationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
