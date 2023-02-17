import { Injectable } from '@angular/core';
import { Posts } from './student.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsCollection = '/posts';
  paginator: any;
  
  constructor(private angularFirestore: AngularFirestore) { }
  getPostsDoc(id:any){
    return this.angularFirestore
    .collection(this.postsCollection)
    .doc(id)
    .valueChanges()
  }
  getPoststList(){
    return this.angularFirestore
    .collection(this.postsCollection)
    .snapshotChanges().pipe(
      map(x=>{
      return   x.map(doc=>{
          const data = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          return data
        })
      })

    )
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
