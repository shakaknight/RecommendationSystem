import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';
import { NotifyOneComponent } from '../notify-one/notify-one.component';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
interface mentor {
  field:String;  
    id: Number;  
    name: String;
    rating: Number;
    experience: Number;
    contact: String;    
}  
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
value = 'Clear me';
  constructor(private taskService:TaskService,public dialog: MatDialog) { }
results: mentor[];

  ngOnInit(): void {
  }
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  name = "----"
  
  update(e){
    this.name = e.target.value
    console.log(this.name);
  }

  search()
  {
    const names= [
    {"name": this.name}
   ]
    this.taskService.search(names).subscribe((results: mentor[])=>{
      console.log(results);
      this.results=results;
    })
  }
    
  popup(resulter:any) {
    console.log(resulter);
    this.dialog.open(NotifyOneComponent, {
      width: '500px', height: '55vh',
      data: resulter,
      disableClose: true
    });
  }
}
