import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapListComponent } from './recap-list.component';

describe('RecapRecordComponent', () => {
  let component: RecapRecordComponent;
  let fixture: ComponentFixture<RecapRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
