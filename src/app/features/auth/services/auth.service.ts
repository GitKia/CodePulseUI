import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/log-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User |undefined>(undefined)

  constructor(private http: HttpClient) { }

  login(requst : LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: requst.email,
      password: requst.password
    })
  }


  setUser(user: User): void {

    this.$user.next(user);
    localStorage.setItem('user-email', user.emial);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

}
