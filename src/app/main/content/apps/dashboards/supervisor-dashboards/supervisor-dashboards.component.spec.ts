import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorDashboardsComponent } from './supervisor-dashboards.component';

describe('SupervisorDashboardsComponent', () => {
  let component: SupervisorDashboardsComponent;
  let fixture: ComponentFixture<SupervisorDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
