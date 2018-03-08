import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSelectionComponent } from './emp-selection.component';

describe('EmpSelectionComponent', () => {
  let component: EmpSelectionComponent;
  let fixture: ComponentFixture<EmpSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
