import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapRecordDetailsComponent } from './recap-record-details.component';

describe('CheckinRecordComponent', () => {
  let component: CheckinRecordComponent;
  let fixture: ComponentFixture<CheckinRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
