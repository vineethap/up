import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicRatingComponent } from './topic-rating.component';

describe('TopicRatingComponent', () => {
  let component: TopicRatingComponent;
  let fixture: ComponentFixture<TopicRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
