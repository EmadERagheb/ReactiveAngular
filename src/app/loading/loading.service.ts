import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, concatMap, finalize } from "rxjs/operators";

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log({"ctor":this.loadingSubject})

    console.log("Loading service created ...");
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    console.log("showLoaderUntilCompleted")
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    
    this.loadingSubject.next(true);
    console.log({"reita":this.loadingSubject})
  }

  loadingOff() {
    console.log("loading off")
    console.log({"reita":this.loadingSubject})

    this.loadingSubject.next(false);
  }
}
