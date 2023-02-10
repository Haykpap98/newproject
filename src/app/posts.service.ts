import { Injectable } from '@angular/core';
import { Posts } from './student.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsCollection = '/posts';
  paginator: any;
  
  constructor(private angularFirestore: AngularFirestore) { }
  getPostsDoc(id: string){
    return this.angularFirestore
    .collection(this.postsCollection)
    .doc(id)
    .valueChanges()
  }
  getPoststList(){
    return this.angularFirestore
    .collection(this.postsCollection)
    .snapshotChanges()
  }
  createPosts(posts: Posts){
      return this.angularFirestore
      .collection(this.postsCollection)
      .add(posts)
      
  }
  deletePosts(posts: any){
    return this.angularFirestore
    .collection(this.postsCollection)
    .doc(posts.id)
    .delete()
  }
  updatePosts(posts: Posts, id: any){
    return this.angularFirestore
    .collection(this.postsCollection)
    .doc(id)
    .update({
      title: posts.title,
      text: posts.text,
      author: posts.author,
      date: posts.date,
    })
  }
}
