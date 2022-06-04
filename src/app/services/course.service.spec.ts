import {CourseService} from './course.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

describe('Courses Service', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const expectedResponse = [
    {
      id: 1,
      title: 'Course title 1',
      description: 'Course description 1'
    },
    {
      id: 2,
      title: 'Course title 2aawd',
      description: 'Course description 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCourses$() should return all courses', () => {
    service.getCourses$().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');

    req.flush(expectedResponse);
  });

  it('getCourse(id) should return course with parameter id if it exists in the list', () => {

    const expectedCourse = expectedResponse[0];
    service.getCourse$(expectedCourse.id).subscribe((response) => {
      expect(response.id).toEqual(expectedCourse.id);
      expect(response.title).toEqual(expectedCourse.title);
      expect(response.description).toEqual(expectedCourse.description);
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${expectedCourse.id}`);
    expect(req.request.method).toBe('GET');

    req.flush(expectedCourse);
  });

  it('getCourse(id) should return undefined if course with this id does not exist', () => {
    const id = 7;
    service.getCourse$(id).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('delete$() should send DELETE', () => {
    const id = 1;
    service.delete$(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/courses/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('save$() should sent POST request if id is not defined', () => {
    const courseToAdd = {
      id: null,
      title: 'Course super new new'
    };

    service.save$(courseToAdd).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
  });

  it('save$() should sent PUT request if id is defined', () => {
    const courseToUpdate = {
      id: 1,
      title: 'Updated old course'
    };

    service.save$(courseToUpdate).subscribe();
    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseToUpdate.id}`);
    expect(req.request.method).toBe('PUT');
  });
});
