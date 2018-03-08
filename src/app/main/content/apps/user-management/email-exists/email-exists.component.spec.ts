import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailExistsComponent } from './email-exists.component';

describe('EmailExistsComponent', () => {
  let component: EmailExistsComponent;
  let fixture: ComponentFixture<EmailExistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailExistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
