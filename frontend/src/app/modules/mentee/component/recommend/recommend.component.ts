import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import {  MatDialog } from "@angular/material/dialog";
import { NotifyOneComponent } from '../notify-one/notify-one.component';

interface mentor {  
    id: Number;  
    name: String;    
    rating: Number;
    experience: Number;
    contact: String;
    field: String;
    wr: String;
}  

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  id:number;
  name:String;
  players = [
    "Data Analysis",
    "Data Science",
    "Artificial Intelligence",
    "Web Devlopment",
    "IOT",
    "Cloud",
    "UI/UX",
    "Mathematics",
    "Computer graphics",
    "Machine Learning",
    "Networking",
    "Software Testing",
    "Robotics",
    "Embedded Systems",
    "Digital Sytems and Microprocessors",
    "DBMS",
    "Algorithms",
    "Physics",
    "Chemistry",
    "Digital Marketing",
  ]

  constructor(private taskService:TaskService, public dialog: MatDialog,) { }
results: mentor[];
  ngOnInit(): void {
  }

  selected = "----"
  
  update(e){
    this.selected = e.target.value
    console.log(this.selected);
  }

  predicter()
  {
    const profession= [
    {"Profession": this.selected}
   ]
    this.taskService.predict(profession).subscribe((results: mentor[])=>{
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
