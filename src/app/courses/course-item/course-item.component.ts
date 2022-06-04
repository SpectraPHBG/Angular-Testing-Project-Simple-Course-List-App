import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {

  @Input() course: Course;

  @Output() clicked = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<number>();

  onClick(): void {
    this.clicked.emit(this.course);
  }

  onDelete(): void {
    this.deleted.emit(this.course.id);
  }
}
