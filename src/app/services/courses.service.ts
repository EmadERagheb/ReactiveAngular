import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private courseEndPoint = "/api/courses";
  private lessonsEndPoint = "/api/lessons";

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
  searchLessons(search: string): Observable<Lesson[]> {
    let params = new HttpParams();
    params = params.append("filter", search);
    params = params.append("pageSize", 100);
    return this.http
      .get<Lesson[]>(this.lessonsEndPoint, { params })
      .pipe(map((result) => result["payload"], shareReplay()));
  }
}
