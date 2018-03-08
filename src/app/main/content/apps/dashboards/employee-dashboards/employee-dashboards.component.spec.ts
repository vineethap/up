import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardsComponent } from './employee-dashboards.component';

describe('EmployeeDashboardsComponent', () => {
  let component: EmployeeDashboardsComponent;
  let fixture: ComponentFixture<EmployeeDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
