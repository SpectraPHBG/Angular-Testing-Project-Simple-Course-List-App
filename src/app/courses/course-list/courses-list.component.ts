import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses: Course[];
  selectedCourse: Course;

  constructor(private coursesService: CourseService) {
    this.courses = [];
  }

  ngOnInit(): void {
    this.coursesService.getCourses$().subscribe({
      next: (response: Course[]) => {
        this.courses = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  onItemDeleted(id: number): void {
    this.coursesService.delete$(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(movie => movie.id !== id);
      }
    });
  }

  onItemClicked(course: Course): void {
    this.selectedCourse = course;
  }
}
