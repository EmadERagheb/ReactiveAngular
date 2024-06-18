import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { json } from "body-parser";
const AUTH_DATA = "auth_data";
@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private loginEndPoint = "/api/login";
  private userSubject = new BehaviorSubject(null);
  user$: Observable<User> = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginEndPoint, { email, password }).pipe(
      tap((user) => {
        this.userSubject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }
  logout() {
    this.userSubject.next(null);
    localStorage.clear();
  }
}
