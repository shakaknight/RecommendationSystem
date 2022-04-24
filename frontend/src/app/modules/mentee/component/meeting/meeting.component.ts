import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from 'src/app/models/meeting.model';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';

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


  getMeeting(){
    this.taskService.getMeetingMentee(localStorage.getItem('user-email')).subscribe((res:Meeting[])=>{
      this.meetings=res;
      console.log(this.meetings)
    })
  }
}
