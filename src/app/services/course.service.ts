import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {
  }

  getCourses$(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  getCourse$(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  save$(body: Course): Observable<Course>{
    if (body.id){
      return this.put$(body);
    }
    return this.post$(body);
  }

  private post$(body: Course): Observable<Course> {
    return this.http.post<Course>(this.url, body);
  }

  private put$(body: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${body.id}`, body);
  }

  delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/${id}`);
  }
}
