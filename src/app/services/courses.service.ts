import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseEndPoint = "/api/courses";


 

  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseEndPoint).pipe(
      map((result) => result["payload"]),
      shareReplay()
    );
  }
  saveCourses(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(this.courseEndPoint + "/" + courseId, changes)
      .pipe(shareReplay());
  }
  
}
