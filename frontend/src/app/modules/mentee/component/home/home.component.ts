import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
   map(({ matches }) => {
     if (matches) {
       return {
         columns: 1,
         miniCard: { cols: 1, rows: 1 },
         chart: { cols: 1, rows: 2 },
         table: { cols: 1, rows: 4 },
       };
     }

    return {
       columns: 3,
       miniCard: { cols: 1, rows: 2 },
        chart: { cols: 3, rows: 2 },
      //  table: { cols: 4, rows: 4 },
     };
   })
 );
// 
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

}
