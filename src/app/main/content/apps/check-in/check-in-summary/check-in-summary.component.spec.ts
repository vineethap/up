import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInSummaryComponent } from './check-in-summary.component';

describe('CheckInSummaryComponent', () => {
  let component: CheckInSummaryComponent;
  let fixture: ComponentFixture<CheckInSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
