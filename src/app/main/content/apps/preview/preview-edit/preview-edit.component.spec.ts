import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEditComponent } from './preview-edit.component';

describe('PreviewEditComponent', () => {
  let component: PreviewEditComponent;
  let fixture: ComponentFixture<PreviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
