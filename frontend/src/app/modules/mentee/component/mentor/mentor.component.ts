import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {

  request: Request[];
  mentors: User[]=[];
  temp: User[] = [];
  tempthree: User[] = [];
  temps: String;
  temptwo : any;

  constructor(private taskService:TaskService,) { }

  ngOnInit(): void {
  this.getUser()
  }

getUser(){
  this.taskService.getUserInfo(localStorage.getItem('user-email')).subscribe((result) => {
    console.log(result[0]["members"][0]["member_email"])
    this.temps=result[0]["members"][0]["member_email"];
    this.taskService.getUserInfo(this.temps).subscribe((result) => {
        let tem = this.mentors.push(result[0])
        console.log(this.mentors)
    })  
  })
}

}
