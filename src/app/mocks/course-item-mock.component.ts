import {Component, Input} from '@angular/core';
import {Course} from '../models/course.model';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-course-item',
  template: ''
})
export class CourseItemMockComponent {
  @Input() course: Course;
}
