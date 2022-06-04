import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ CourseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.course = {
      id: 1,
      title: 'mock course title',
      description: 'mock course description'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit with value', () => {
    const spy = spyOn(component.clicked, 'emit');

    component.onClick();
    expect(spy).toHaveBeenCalledWith(component.course);
  });

  it('should emit delete event with movie id', () => {
    const spy = spyOn(component.deleted, 'emit');

    component.onDelete();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
