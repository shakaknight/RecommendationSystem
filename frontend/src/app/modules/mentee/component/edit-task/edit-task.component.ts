import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private taskService: TaskService,public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  editTask(title: string) {
    this.taskService.editTask(this.data._id,title,this.data.completed).subscribe(() => {
      console.log("Task created");
      // Now we navigate to /lists/task._id
      // this.router.navigate([ '/lists']);
      this.close() 
    });
  }
  close() {
    this.dialog.closeAll()
  }
}
