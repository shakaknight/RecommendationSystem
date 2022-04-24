import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Problem } from 'src/app/models/problem.model';
import { PopOneComponent } from '../pop-one/pop-one.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
problems: Problem[]=[];
  constructor(private taskService: TaskService,public dialog: MatDialog) { }

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
    const email = localStorage.getItem('user-email');
    this.taskService.getProblems(email).subscribe((result:Problem[])=>{
      console.log(result)
      this.problems = result;
    })
  }
  deleteProblem(id:String){
    this.taskService.deleteProblem(id).subscribe((res:any)=>{
      console.log(res);
      this.viewProblem();
    })
  }
  viewSolution(id:String){
    console.log(id)
      this.dialog.open(PopOneComponent, {
      width: '70vw', height: '75vh',
      data: id,
      disableClose: true
    });
  }
}
