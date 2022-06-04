import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CourseService} from '../../services/course.service';
import {CoursesListComponent} from '../course-list/courses-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseMockService} from '../../mocks/course.mock.service';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ CourseFormComponent ],
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
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form with validators', () => {
    // prerequisites

    // act
    component.ngOnInit();

    // assert
    expect(component.formGroup).not.toBe(undefined);
    expect(Object.keys(component.formGroup.controls).length).toBe(3);
    expect(component.formGroup.get('title').invalid).toBe(true);
    expect(component.formGroup.get('title').invalid).toBeTrue();
  });

  it('should have form with title field valid', () => {
    // arange
    component.ngOnInit();
    expect(component.formGroup).not.toBe(undefined);
    expect(component.formGroup.get('title').valid).toBeFalse();

    // act
    component.formGroup.get('title').setValue('test');

    // assert
    expect(component.formGroup.get('title').valid).toBeTrue();
  });

  it('should have valid form group', () => {
    // arange
    component.ngOnInit();
    expect(component.formGroup).not.toBe(undefined);
    expect(component.formGroup.valid).toBeFalse();

    // act
    component.formGroup.setValue({
      id: null,
      title: 'test title',
      description: 'test description'
    });

    // assert
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should navigate to home page when submitting after calling onSubmit', () => {

    component.ngOnInit();
    expect(component.formGroup).not.toBe(undefined);
    component.formGroup.setValue({
      id: null,
      title: 'test title',
      description: 'test description'
    });
    expect(component.formGroup.valid).toBeTrue();

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should not navigate to home page when not submitting after calling onSubmit ', () => {

    component.ngOnInit();
    expect(component.formGroup).not.toBe(undefined);
    expect(component.formGroup.valid).toBeFalse();

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });

  it('title control should be invalid if empty (required validator)', () => {
    const titleControl = component.formGroup.get('title');
    const errors = titleControl.errors || {};

    expect(errors.required).toBeTrue();
  });

  it('title control should be invalid if length is less than 3 (minLength validator)', () => {
    const titleControl = component.formGroup.get('title');

    titleControl.setValue('v');
    const errors = titleControl.errors || {};

    expect(errors.minlength).toBeTruthy();
    expect(errors.minlength.requiredLength).toBe(3);
    expect(errors.minlength.actualLength).toBe(1);
  });

  it('description control should be invalid if length is more than 50 (maxLength validator)', () => {
    const descriptionControl = component.formGroup.get('description');

    descriptionControl.setValue('111111111111111111111111111111111111111111111111111');
    const errors = descriptionControl.errors || {};

    expect(errors.maxlength).toBeTruthy();
    expect(errors.maxlength.requiredLength).toBe(50);
    expect(errors.maxlength.actualLength).toBe(51);
  });
});
