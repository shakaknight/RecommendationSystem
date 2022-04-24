import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Problem } from 'src/app/models/problem.model';
import { MatDialog } from '@angular/material/dialog';
import { NotifyOneComponent } from '../notify-one/notify-one.component';
import { PopOneComponent } from '../pop-one/pop-one.component';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
problems: Problem[]=[];
  constructor(private taskService: TaskService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.viewProblem();
  }
  submit(problem:String,fields:String){
    const email = localStorage.getItem('user-email');
    console.log(problem,fields);
    this.taskService.submitProblem(email,problem,fields).subscribe((res:any)=>{
      console.log(res);
      this.viewProblem();
    })
  }
  viewProblem(){
    this.taskService.getAllProblems().subscribe((result:Problem[])=>{
      console.log(result)
      this.problems = result;
    })
  }
  popup(id:String,emailId:String) {
    this.dialog.open(PopOneComponent, {
      width: '500px', height: '55vh',
      data: {
        id:id,
        email:emailId
      },
      disableClose: true
    });
  }
}
