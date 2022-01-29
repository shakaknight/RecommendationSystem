import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  tasks: Task[];

  selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
      console.log(params)
      //   if (params.listId) {
      //     this.selectedListId = params.listId;
      //     this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
      //       this.tasks = tasks;
      //     })
      //   } else {
      //     this.tasks = undefined;
      //   }
      }
    )
    this.taskService.getTask().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks)
    })
}

popup() {
    // console.log(resulter);
    this.dialog.open(NewTaskComponent, {
      width: '500px', height: '55vh',
      disableClose: true
    });
  }

refresh() {
    this.taskService.getTask().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks)
    })
}

 onDeleteTaskClick(value:any) {
   console.log(value)
    this.taskService.deleteTask(value).subscribe((res: any) => {
      console.log("Deleted sucessfully");
      this.refresh();
    })
  }

onTaskClick(task: Task) {
  // we want to set the task to completed
  this.taskService.complete(task).subscribe(() => {
    // the task has been set to completed successfully
    console.log("Completed successully!");
    task.completed = !task.completed;
  })
}

}

  // this.taskService.getLists().subscribe((lists: List[]) => {
  //     this.lists = lists;
  //   })
    
  // }

  // onTaskClick(task: Task) {
  //   // we want to set the task to completed
  //   this.taskService.complete(task).subscribe(() => {
  //     // the task has been set to completed successfully
  //     console.log("Completed successully!");
  //     task.completed = !task.completed;
  //   })
  // }

  // onDeleteListClick() {
  //   this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
  //     this.router.navigate(['/lists']);
  //     console.log(res);
  //   })
  // }

  // onDeleteTaskClick(id: string) {
  //   this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
  //     this.tasks = this.tasks.filter(val => val._id !== id);
  //     console.log(res);
  //   })