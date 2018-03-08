import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCheckinComponent } from './start-checkin.component';

describe('StartCheckinComponent', () => {
  let component: StartCheckinComponent;
  let fixture: ComponentFixture<StartCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
