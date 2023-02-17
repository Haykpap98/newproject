import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../services/auth.service';
import { Posts } from '../student.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  Posts!: Posts[];
  currentUser: any
  constructor(
    private postsService: PostsService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPosts();

    this.authService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
    });
  }
  getPosts() {
    this.postsService.getPoststList().subscribe((posts) => {
      this.Posts = posts.map((e) => {
        if (e.date) {
          e.date = new Date(e.date.seconds * 1000);
        }
        return e;
      });
    });
    // this.Posts = res.map((e) => {
    //   if(e.date){
    //     e.date = new Date(e.date.seconds * 1000).toLocaleDateString('en-GB')
    //   }
    //   return e
    // });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    post: any
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
        this.postsService.deletePosts(post);
      }
    });
  }
}
