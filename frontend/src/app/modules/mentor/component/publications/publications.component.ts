import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
publications: Publication[];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPublication();
  }
  getPublication(){
    this.publications = [];
    this.taskService.getPublications().subscribe((result:Publication[]) =>  {
      console.log(result)
      this.publications=result;
    })
  }
  
  refresh(){
    this.getPublication();
  }

}
