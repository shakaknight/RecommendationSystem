import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Resource } from 'src/app/models/resource.model';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
resources: Resource[];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getResource();
  }
  getResource(){
    this.resources = [];
    this.taskService.getResources().subscribe((result:Resource[]) =>  {
      console.log(result)
      this.resources=result;
    })
  }
  
  refresh(){
    this.getResource();
  }

  popup() {
      // console.log(resulter);
      this.dialog.open(PopUpComponent, {
        width: '500px', height: '55vh',
        disableClose: true
      });
  }
}
