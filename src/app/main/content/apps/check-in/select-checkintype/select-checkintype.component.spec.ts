import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCheckintypeComponent } from './select-checkintype.component';

describe('SelectCheckintypeComponent', () => {
  let component: SelectCheckintypeComponent;
  let fixture: ComponentFixture<SelectCheckintypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCheckintypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCheckintypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
