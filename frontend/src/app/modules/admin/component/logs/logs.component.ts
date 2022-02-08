import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Request } from 'src/app/models/request.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
Requests: Request[];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRequests();
  }
  getRequests() {
    this.Requests = [];
    this.taskService.getRequests().subscribe((results:Request[]) => {
      console.log(results);
      this.Requests=results;
    })
  }
  onDelete(id:string){
    this.taskService.deleteRequest(id).subscribe((result : any) => {
      console.log(result);
      this.getRequests();
    })
  }
}
