import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit{
  Student!: Student[]
  
  constructor(private studentService: StudentService){}
 
  ngOnInit(): void {
   this.studentService.getStudentList().subscribe(res => {
     this.Student = res.map( e => {
       return{
         id: e.payload.doc.id,
         ...e.payload.doc.data() as {}
       } as unknown  as Student;   
     })
   })
  }
  
  removeStudent(student: any){
    if(confirm("Are you sure to delete" + " " + student.FirstName + " " + student.LastName)){
      this.studentService.deleteStudent(student)
    }
  }
}
