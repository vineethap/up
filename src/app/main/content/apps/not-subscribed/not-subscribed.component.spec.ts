import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSubscribedComponent } from './not-subscribed.component';

describe('NotSubscribedComponent', () => {
  let component: NotSubscribedComponent;
  let fixture: ComponentFixture<NotSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
