import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-pop-one',
  templateUrl: './pop-one.component.html',
  styleUrls: ['./pop-one.component.scss']
})
export class PopOneComponent implements OnInit {
email: String="mentor@gmail.com";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private notifierService:NotifierService,private taskService:TaskService) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  request(email:string){
    this.taskService.requestMentor(email,localStorage.getItem('user-email')).subscribe((result:any) => {
      console.log(result)
    });
  }
 submit(target:String,future:String,upload:String){
   this.taskService.submitSolution(this.data['id'],localStorage.getItem('user-email'),target,future,upload).subscribe((result:any)=>{
     this.close()
   })
   this.request(this.data['email']);
 }
 close() {
    this.dialog.closeAll()
  }
}
