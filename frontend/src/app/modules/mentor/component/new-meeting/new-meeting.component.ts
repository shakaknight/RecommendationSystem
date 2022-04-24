import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.scss']
})
export class NewMeetingComponent implements OnInit {
  request: Request[];
  mentees_tmp: User[];
  temp: User[] = [];
  tempthree: User[] = [];
  mentees: User[];
  temps: String;
  temptwo : any;
  
  constructor(private taskService: TaskService,public dialog: MatDialog, private router: Router) { }
 ngOnInit(): void {
    this.getMentee()
  }
   selectedLevel;
   dateOfEvent = new FormControl();
   getMentee() {
   this.mentees = []
   this.temp = []
   this.tempthree = []
   this.request = []
    this.taskService.getMentee().subscribe((request:Request[]) => {
      this.request = request;
      console.log(this.request);
      for(let key in this.request){
        let tem = this.tempthree.push(this.request[key]['mentee_email'])
      }
        this.mentees = this.temp;
        this.mentees_tmp = this.tempthree;
        console.log(this.mentees_tmp);
    })
  }

  selected(){
    console.log(this.selectedLevel)
  }

  submit(link:String,time:any,date:any){
    this.taskService.submitMeeting(localStorage.getItem('user-email'),this.selectedLevel,link,date.toString(),time).subscribe((res:any)=>{
      console.log(res);
    })
    this.close();
  }

  close() {
    this.dialog.closeAll()
  }
}
