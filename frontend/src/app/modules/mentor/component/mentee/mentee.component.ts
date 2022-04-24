import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { Wpr } from 'src/app/models/wpr.model';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
})
export class MenteeComponent implements OnInit {

  request: Request[];
  accepted: User[];
  temp: User[] = [];
  tempthree: User[] = [];
  mentees: User[];
  temps: String;
  temptwo : any;
  wprs: Wpr[]=[];
  constructor(private taskService:TaskService,) { }

  ngOnInit(): void {
  this.getMentee()
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

  delete(mentee:any){
    // this.getMentee();
    console.log(this.request);
    for(let key in this.request){
      if(this.request[key]["mentee_email"]==mentee){
      console.log(this.request[key]["_id"])
      this.temps = this.request[key]["_id"];
      }
    }
    this.taskService.deleteRequest(this.temps).subscribe((result: any) => {
      console.log(result)
       this.getMentee();
    })
  }

  accept(mentee:any){
    this.temptwo = []
    for(let key in this.request){
        if(this.request[key]["mentee_email"]==mentee){
        console.log(this.request[key]);
        this.temptwo = this.request[key];
        }
      }
      this.taskService.acceptMentor(localStorage.getItem('user-email'),mentee,this.temptwo).subscribe((result: any) => {
        console.log(result)
        this.setMentor(mentee);
        this.getMentee();
      })
  }

  refresh(){
    this.getMentee();
  }

  setMentor(email:String){
    this.taskService.setMentor(email,localStorage.getItem('user-email')).subscribe((result)=>{
      console.log(result)
    })
  }

  viewWPR(email:String){
    this.taskService.getWPRs(email).subscribe((result:Wpr[])=>{
      console.log(result)
      this.wprs = result;
    })
  }
  changeStatus(_id:String,email:String,status:any){
    console.log(_id,status);
    this.taskService.changeStatus(_id,status).subscribe((result:any)=>{
      console.log(result);
      this.viewWPR(email);
    });
  }
}
