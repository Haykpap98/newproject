import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { Posts } from '../student.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  Posts!: Posts[] ;

  constructor(
    private postsService: PostsService,
  ) {}

  
  ngOnInit(): void {
    this.getPosts();

  }
  getPosts(){
    this.postsService.getPoststList().subscribe((res) => {
      this.Posts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as unknown as Posts;
      });
      console.log(this.Posts)
    });
  }

  addComment(){
     
  }
  romoveComment(){

  }
  
}
