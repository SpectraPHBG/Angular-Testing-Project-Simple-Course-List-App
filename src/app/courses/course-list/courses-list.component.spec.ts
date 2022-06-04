import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {CoursesListComponent} from './courses-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CourseService} from '../../services/course.service';
import {Component, Input} from '@angular/core';
import {Course} from '../../models/course.model';
import {CourseFormComponent} from '../course-form/course-form.component';
import {CourseItemMockComponent} from '../../mocks/course-item-mock.component';
import {CourseMockService} from '../../mocks/course.mock.service';


describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CoursesListComponent, CourseItemMockComponent ],
      providers: [
        {
          provide: CourseService,
          useClass: CourseMockService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 course-item components', () => {
    component.courses = [
      {title: 'c1'},
      {title: 'c2'}
    ];

    component.ngOnInit();

    fixture.detectChanges();

    const nodeList = fixture.nativeElement.querySelectorAll('app-course-item'); // връща ни елементите с този таг
    const elements = Array.from(nodeList);

    expect(elements.length).toBe(component.courses.length);
  });

  it('should not have any courses before ngOnInit is called', () => {
    expect(component.courses).toBeDefined();
    expect(component.courses).toHaveSize(0);
  });

  it('should have defined 2 courses after ngOnInit is called', () => {
    component.ngOnInit();

    expect(component.courses).toBeDefined();
    expect(component.courses).toHaveSize(2);
  });

  it('should have the same selected movie as the one that comes as input from user', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const spy = spyOn(component, 'onItemClicked').and.callThrough();
    component.onItemClicked(component.courses[0]);

    expect(component.selectedCourse.id).toEqual(1);
    expect(spy).toHaveBeenCalledWith(component.courses[0]);
  });

  it('should delete movie with the same id as parameter', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const spy = spyOn(component, 'onItemDeleted').and.callThrough();
    component.onItemDeleted(1);

    expect(component.courses.length).toEqual(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
