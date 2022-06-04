import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  course: Course;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        const id = params.id;

        if (!id) {
          return of(null);
        }
        return this.courseService.getCourse$(id);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (course) => {
        this.course = course;
        this.buildForm();
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.courseService.save$(this.formGroup.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.course?.id,
      title: [this.course?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.course?.description, [Validators.maxLength(50)]]
    });
  }
}
