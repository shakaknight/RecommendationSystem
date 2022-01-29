import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService,public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  createTask(title: string) {
    this.taskService.createTask(title).subscribe(() => {
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
