import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommentsService } from '../comments.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../services/auth.service';
import { Posts } from '../student.model';

@Component({
  selector: 'app-posts-text',
  templateUrl: './posts-text.component.html',
  styleUrls: ['./posts-text.component.scss'],
})
export class PostsTextComponent {
  postText: any;
  postComment: any
  currentUser: any
  private  postId = this.act.snapshot.paramMap.get('id');
  public formText!: FormGroup;
  constructor(
    private postsService: PostsService,
    private commentService: CommentsService,
    private act: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.formText = this.formBuilder.group({
      postId:[this.postId],
      comments: [''],
      created_by: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getPost();
    this.getPostComments()
    this.getCurrentUser()
   
    this.authService.getCurrentUser().subscribe((res)=>{
      this.currentUser = res
    })
  }
  getCurrentUser() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((res) => {
        this.formText.get('created_by')?.patchValue(res?.email);
      });
  }
  getPost() {
    this.postsService.getPostsDoc(this.postId).subscribe((post:any) => {
      this.postText =  post;
      if(this.postText.date){
        this.postText.date =  new Date(this.postText.date.seconds * 1000)
      }
    });
  }
  getPostComments(){
    this.commentService.getComments(this.postId).subscribe(res=>{
      this.postComment = res
    })
  }

  addComment() {
    this.commentService.addCommentToPost(this.formText.value).then(()=>{
      this.formText.get('comments')?.reset()
    })
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    comment: any
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
        this.commentService.deleteComment(comment);
      }
    });
  }
}
