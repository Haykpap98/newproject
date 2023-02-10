import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss'],
})
export class AddPostsComponent {
  public postsForm: FormGroup;
  value1!: string;
  value2!: string;
  val3!: string;
  date2!: Date;

  constructor(
    public postsService: PostsService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.postsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: [null, Validators.required],
      text: ['', Validators.required],
      date:  ['', Validators.required]
    });
  }

  onSubmit1() {
    this.postsService.createPosts(this.postsForm.value);
    this.router.navigate(['/dashboard/posts']);
  }
}
