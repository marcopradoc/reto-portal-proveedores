import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  readonly usuarioUrl = 'http://localhost:47283/api/usuario/';

  constructor(
    private router: Router,
    private http: HttpClient
) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
}

  public get userValue() {
    return this.userSubject.value;
}

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.usuarioUrl + 'login', { username, password })
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(response.result));
        this.userSubject.next(response.result);
        return response.result;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}
}
