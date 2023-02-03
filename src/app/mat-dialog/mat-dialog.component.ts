import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent {
  constructor(public dialogRef: MatDialogRef<MatDialogComponent>){}

  closeDialog() {
    this.dialogRef.close(false);
  }
}
