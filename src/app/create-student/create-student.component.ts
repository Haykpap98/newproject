import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      FirstName: ['',[Validators.required, Validators.minLength(4)]],
      LastName: ['',[Validators.required, Validators.minLength(4)]],
      Contact: ['',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(4)]],
      Email: ['',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),        
      ],
    ]
      
    })
  }
  
  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.studentService.createStudent(this.studentForm.value)
    this.router.navigate(['list-student'])
  }
}
