import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleStripeComponent } from './sample-stripe.component';

describe('SampleStripeComponent', () => {
  let component: SampleStripeComponent;
  let fixture: ComponentFixture<SampleStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
