import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  public editForm!: FormGroup;
  studentRef: any;

  constructor(
    public studentService: StudentService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Contact: [''],
      Email: [''],
    });
  }

  ngOnInit(): void {
    const id: any = this.act.snapshot.paramMap.get('id');

    this.studentService.getStudentDoc(id).subscribe((res) => {
      this.studentRef = res;
      this.editForm = this.formBuilder.group({
        FirstName: [
          this.studentRef?.FirstName,
          [Validators.required, Validators.minLength(4)],
        ],
        LastName: [
          this.studentRef?.LastName,
          [Validators.required, Validators.minLength(4)],
        ],
        Contact: [
          this.studentRef?.Contact,
          [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.minLength(4),
          ],
        ],
        Email: [
          this.studentRef?.Email,
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ],
        ],
      });
    });
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.studentService.updateStudent(this.editForm.value, id);
    this.router.navigate(['list-student']);
  }
}
