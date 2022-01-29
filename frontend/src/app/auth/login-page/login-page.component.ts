import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { TaskWebRequestService } from 'src/app/services/task-web-request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
 faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}
// this.auth.isLoggedIn()
  ngOnInit(): void {
    if (localStorage.getItem('user-id')!=null) {
      console.log(localStorage.getItem('user-id'))
     if (localStorage.getItem('user-type')=="mentee") {
        // we have logged in successfully
        this.router.navigate(['/mentee']);
      }
      if (localStorage.getItem('user-type')=="mentor") {
        // we have logged in successfully
        this.router.navigate(['/mentor']);
      }
      if (localStorage.getItem('user-type')=="admin") {
        // we have logged in successfully
        this.router.navigate(['/admin']);
      }
    }
  }
  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.auth.login(this.loginForm.value).subscribe(
  //       (result) => {
  //         console.log(result);
  //         this.router.navigate(['/mentee']);
  //       },
  //       (err: Error) => {
  //         alert(err.message);
  //       }
  //     );
  //   }
  // console.log(this.loginForm.value);
  // }

  // onLoginButtonClicked
  onSubmit(email: string, password: string) {
    this.auth.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200 && this.auth.getUserType()=="mentee") {
        // we have logged in successfully
        this.router.navigate(['/mentee']);
      }
      if (res.status === 200 && this.auth.getUserType()=="mentor") {
        // we have logged in successfully
        this.router.navigate(['/mentor']);
      }
      if (res.status === 200 && this.auth.getUserType()=="admin") {
        // we have logged in successfully
        this.router.navigate(['/admin']);
      }
      console.log(res);
      console.log(this.auth.getUserType());
      console.log(localStorage.getItem('user-email'));
    });
  }

}

  // onLoginButtonClicked(email: string, password: string) {
    // this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
    //   if (res.status === 200) {
    //     // we have logged in successfully
    //     this.router.navigate(['/lists']);
    //   }
    //   console.log(res);
      
    // });
  //   this.router.navigate([{outlets: {"main-outlet": 'home'}}]);
  // }