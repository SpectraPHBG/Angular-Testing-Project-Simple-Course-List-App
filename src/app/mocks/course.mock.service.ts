import {Course} from '../models/course.model';
import {Observable, of} from 'rxjs';

export class CourseMockService{

  courses = [
    {
      id: 1,
      title: 'm1'
    },
    {
      id: 2,
      title: 'm2'
    }
  ];

  getCourses$(): Observable<Course[]> {
    return of([...this.courses]); // прави копие на обекта и го връща
  }
  save$(body: Course): Observable<Course> {
    // @ts-ignore
    return of({});
  }
  delete$(id: number): Observable<undefined> {
    this.courses = this.courses.filter(c => c.id !== id);
    return of(undefined);
  }
}
