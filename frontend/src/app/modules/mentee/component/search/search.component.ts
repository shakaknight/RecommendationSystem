import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
interface mentor {
  field:String;  
    id: Number;  
    name: String    
}  
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
value = 'Clear me';
  constructor(private taskService:TaskService) { }
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
}
