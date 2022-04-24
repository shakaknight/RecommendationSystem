import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from 'src/app/models/meeting.model';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';
import { NewMeetingComponent } from '../new-meeting/new-meeting.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  meetings: Meeting[];
  constructor(private taskService:TaskService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMeeting();
  }

  new_meetings(){
    this.dialog.open(NewMeetingComponent, {
        width: '500px', height: '55vh',
        disableClose: true
      });
  }

  getMeeting(){
    this.taskService.getMeeting(localStorage.getItem('user-email')).subscribe((res:Meeting[])=>{
      this.meetings=res;
      console.log(res)
    })
  }

  deleteMeet(id:string){
    this.taskService.deleteMeeting(id).subscribe((res:any)=>{
      console.log(res)
      this.getMeeting();
    })
  }

}
