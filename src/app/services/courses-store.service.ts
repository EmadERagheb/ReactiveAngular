// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable, throwError } from "rxjs";
// import { Course, sortCoursesBySeqNo } from "../model/course";
// import {
//   catchError,
//   finalize,
//   map,
//   retry,
//   shareReplay,
//   tap,
// } from "rxjs/operators";
// import { HttpClient } from "@angular/common/http";
// import { LoadingService } from "../loading/loading.service";
// import { MessagesService } from "../messages/messages.service";

// @Injectable({
//   providedIn: "root",
  
// })

// export class CoursesStoreService {
//   private courseEndPoint = "/api/courses";
//   private coursesSubject = new BehaviorSubject<Course[]>([]);
//   courses$: Observable<Course[]> = this.coursesSubject.asObservable();
//   constructor(
//     private http: HttpClient,
//     private loading: LoadingService,
//     private messagesServices: MessagesService
//   ) {
//     this.loadAllCourses();
//   }
//   private loadAllCourses() {
//     const loadCourses$ = this.http.get<Course[]>(this.courseEndPoint).pipe(
//       map((response) => response["payload"]),
//       tap((response) => this.coursesSubject.next(response)),
//       catchError((error) => {
//         const message = "Could not load courses";
//         console.log(message, error);
//         this.messagesServices.showError(error);
//         return throwError(error);
//       })
//     );
//     this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
//   }
//   saveCourses(courseId: string, changes: Partial<Course>): Observable<any> {
//     const courses = this.coursesSubject.getValue();
//     const index = courses.findIndex((c) => c.id == courseId);
//     const newCourse: Course = {
//       ...courses[index],
//       ...changes,
//     };
//     const newCourses: Course[] = courses.slice(0);
//     newCourse[index] = newCourse;
//     this.coursesSubject.next(newCourses);
//     return this.http.put(`api/courses/${newCourse.id}`, changes).pipe(
//       shareReplay(),
//       catchError((err) => {
//         const message = "could not save course ";
//         console.log(err, message);
//         this.messagesServices.showError(err);
//         return throwError(err);
//       })
//     );
//   }
//   filterByCategory(category: string): Observable<Course[]> {
//     return this.courses$.pipe(
//       map((coursers) =>
//         coursers
//           .filter((course) => course.category === category)
//           .sort(sortCoursesBySeqNo)
//       )
//     );
//   }
// }
