import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
faLock = faLock;
players = [
    "mentor",
    "mentee",
    "admin"
  ]
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
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
  onSubmit(email: string,pw: string): void {
    if (this.loginForm.valid) {
      this.auth.signup(email,pw,this.selected).subscribe(
        (result) => {
          console.log(result);
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
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }

  
  selected = "----"
  
  update(e){
    this.selected = e.target.value
    console.log(this.selected);
  }

}
