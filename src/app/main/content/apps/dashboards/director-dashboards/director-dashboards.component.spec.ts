import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDashboardsComponent } from './director-dashboards.component';

describe('DirectorDashboardsComponent', () => {
  let component: DirectorDashboardsComponent;
  let fixture: ComponentFixture<DirectorDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
