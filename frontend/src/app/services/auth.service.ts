import { Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TaskWebRequestService } from './task-web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient,private taskWebRequest: TaskWebRequestService) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['login']);
  // }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin@gmail.com' && password === 'admin123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }


  login(email: string, password: string) {
    return this.taskWebRequest.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'),res.body.user_type,res.body.email);
        console.log("LOGGED IN!");
        console.log(localStorage.getItem('user-id'))
        console.log(res)
      })
    )
  }


  signup(email: string, password: string) {
    return this.taskWebRequest.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'),res.body.user_type,res.body.email);
        console.log("Successfully signed up and now logged in!");
      })
    )
  }



  logout() {
    this.removeSession();
    console.log('auth logout')
    this.router.navigate(['login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  getUserEmail() {
    return localStorage.getItem('user-email');
  }

  getUserType(){
    return localStorage.getItem('user-type');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  
  private setSession(userId: string, accessToken: string, refreshToken: string,user_type: string,user_email: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('user-type',user_type);
    localStorage.setItem('user-email',user_email);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-type');
    localStorage.removeItem('user-email');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    console.log('removed')
  }

  getNewAccessToken() {
    return this.http.get(`${this.taskWebRequest.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
}