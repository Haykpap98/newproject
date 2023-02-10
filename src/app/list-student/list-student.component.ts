import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent implements OnInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Student!: Student[] ;
  first = 0;

  rows = 10;

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}



  ngOnInit(): void {
    this.studentService.getStudentList().subscribe((res) => {
      this.Student = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as unknown as Student;
      });
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    student: any
  ): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '350px',
      position: {
        top: '8%',
        left: '35%',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.studentService.deleteStudent(student);
      }
    });
  }
}
