import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-pop-two',
  templateUrl: './pop-two.component.html',
  styleUrls: ['./pop-two.component.scss']
})
export class PopTwoComponent implements OnInit {

  constructor(private taskService: TaskService,public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  createPublication(title: String,link:String) {
    this.taskService.createPublication(title,link).subscribe(() => {
      console.log("Publication created");
      // Now we navigate to /lists/task._id
      // this.router.navigate([ '/lists']);
      this.close() 
    });
  }
  close() {
    this.dialog.closeAll()
  }
}
