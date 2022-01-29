import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }
  showNotification() {
    this.snackBar.open('Notification Message', 'Button Text',{
      // duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  newTask() {
    this.snackBar.open('Notification Message', 'Button Text',{
      // duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
