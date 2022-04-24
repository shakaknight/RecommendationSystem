import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solution } from 'src/app/models/solution.model';
import { User } from 'src/app/models/user.model';
import { NotifierService } from 'src/app/services/notifier.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-pop-one',
  templateUrl: './pop-one.component.html',
  styleUrls: ['./pop-one.component.scss']
})
export class PopOneComponent implements OnInit {
  solutions: Solution[];
  request: Request[];
  accepted: User[];
  temp: User[] = [];
  tempthree: User[] = [];
  mentees: User[];
  temps: String;
  temptwo : any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private notifierService:NotifierService,private taskService:TaskService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.showSolution();
  }
  showSolution(){
    this.taskService.getSolutions(this.data).subscribe((res:Solution[])=>{
      this.solutions = res;
    })
  }


  close() {
    this.dialog.closeAll()
  }

   getMentee() {
   this.mentees = []
   this.temp = []
   this.tempthree = []
   this.request = []
    this.taskService.getMentee().subscribe((request:Request[]) => {
      this.request = request;
      console.log(this.request);
      for(let key in this.request){
        if(this.request[key]['status']==false){
          this.taskService.getUserInfo(this.request[key]['mentee_email']).subscribe((result: any) => {
                    console.log(result[0])
                   let tem = this.temp.push(result[0])
                  })
        }
        else{
          this.taskService.getUserInfo(this.request[key]['mentee_email']).subscribe((result: any) => {
                  console.log(result[0])
                   let tem = this.tempthree.push(result[0])
                  })
        }
      }
        this.mentees = this.temp;
        this.accepted = this.tempthree;
    })
  }

  accept(mentee:any){
    this.getMentee();
    this.temptwo = []
    for(let key in this.request){
        if(this.request[key]["mentee_email"]==mentee){
        console.log(this.request[key]);
        this.temptwo = this.request[key];
        }
      }
      this.taskService.acceptMentor(localStorage.getItem('user-email'),mentee,this.temptwo).subscribe((result: any) => {
        console.log(result)
        this.getMentee();
        this.setMentor(mentee);
      })
  }

  setMentor(email:String){
    this.taskService.setMentor(email,localStorage.getItem('user-email')).subscribe((result)=>{
      console.log(result)
    })
  }
}
