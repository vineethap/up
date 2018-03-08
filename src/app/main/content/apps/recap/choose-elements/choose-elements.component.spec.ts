import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseElementsComponent } from './choose-elements.component';

describe('ChooseElementsComponent', () => {
  let component: ChooseElementsComponent;
  let fixture: ComponentFixture<ChooseElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
