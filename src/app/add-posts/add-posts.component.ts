import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PostsService } from '../posts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss'],
})
export class AddPostsComponent  {
  public postsForm: FormGroup;
  value1!: string;
  value2!: string;
  val3!: string;
  date2!: Date;

  constructor(
    public postsService: PostsService,
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.postsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: [null, Validators.required],
      text: ['', Validators.required],
      date:  [null],
      created_by: [null, Validators.required],
    });
    this.date2 = new Date()
  }
  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((res) => {
        this.postsForm.get('created_by')?.patchValue(res?.uid);
      });
  }

  onSubmit1() {
    console.log(this.postsForm.value)
    this.postsService.createPosts(this.postsForm.value);
    this.router.navigate(['/dashboard/posts']);
  }
}
