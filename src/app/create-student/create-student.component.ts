import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit{
  
  public studentForm: FormGroup
  
  constructor(
    public studentService: StudentService,
    public formBuilder: FormBuilder,
    public router: Router
  ){
    this.studentForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Contact: [''],
      Email: ['']
      
    })
  }
  
  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.studentService.createStudent(this.studentForm.value)
    this.router.navigate(['list-student'])
  }
}
