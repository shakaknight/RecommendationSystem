import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Wpr } from 'src/app/models/wpr.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-ntcc',
  templateUrl: './ntcc.component.html',
  styleUrls: ['./ntcc.component.scss']
})
export class NtccComponent implements OnInit {
  wprs: Wpr[]=[];
  request: Request[];
  mentors: User[]=[];
  temp: User[] = [];
  tempthree: User[] = [];
  temps: String;
  temptwo : any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.viewWPR();
    this.getUser();
  }
  selectedLevel;
  datas:Number[] = [1,2,3,4,5,6,7,8,9,10];

  selected(){
    console.log(this.selectedLevel)
  }
  submit(target:String, achievement: String, future:String,wpr:String){
    console.log(this.selectedLevel,target, achievement, future,wpr);
      this.taskService.submitWPR(localStorage.getItem('user-email'),this.selectedLevel,target,achievement,future,wpr).subscribe((result:any) => {
      console.log(result);
      });
  }
  viewWPR(){
    const email = localStorage.getItem('user-email');
    this.taskService.getWPRs(email).subscribe((result:Wpr[])=>{
      console.log(result)
      this.wprs = result;
    })
  }
  deleteWPR(id:String){
    this.taskService.deleteWPR(id).subscribe((result)=>{
      console.log(result);
      this.viewWPR();
    })
  }
  getUser(){
  this.taskService.getUserInfo(localStorage.getItem('user-email')).subscribe((result) => {
    console.log(result[0]["members"][0]["member_email"])
    this.temps=result[0]["members"][0]["member_email"];
    this.taskService.getUserInfo(this.temps).subscribe((result) => {
        let tem = this.mentors.push(result[0])
        console.log(this.mentors)
    })  
  })
}
}
