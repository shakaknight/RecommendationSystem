import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-notify-one',
  templateUrl: './notify-one.component.html',
  styleUrls: ['./notify-one.component.scss']
})
export class NotifyOneComponent implements OnInit {
email: String="mentor@gmail.com";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private notifierService:NotifierService,private taskService:TaskService) { }

  ngOnInit(): void {
    console.log(this.data['contact']);
  }
  request(){
    this.taskService.requestMentor(this.data['contact'],localStorage.getItem('user-email')).subscribe((result:any) => {
      console.log(result)
      this.close();
    });
  }
 close() {
    this.dialog.closeAll()
  }
}
