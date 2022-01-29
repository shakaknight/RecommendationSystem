import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(private taskService: TaskService,public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  createResource(title: String,pages:String,link:String) {
    this.taskService.createResource(title,pages,link).subscribe(() => {
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
