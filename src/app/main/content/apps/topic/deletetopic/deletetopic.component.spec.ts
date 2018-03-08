import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetopicComponent } from './deletetopic.component';

describe('DeletetopicComponent', () => {
  let component: DeletetopicComponent;
  let fixture: ComponentFixture<DeletetopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
