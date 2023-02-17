import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Comments } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commenstCollection = '/comments';

  constructor(private angularFirestore: AngularFirestore) { }
  addCommentToPost(comments: Comments){
    return this.angularFirestore
    .collection(this.commenstCollection)
    .add(comments)
    
} 
  getComments(postId:string|null){
    return this.angularFirestore
    .collection(this.commenstCollection,ref=>ref.where('postId','==',postId))
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
  deleteComment(comments: any){
    return this.angularFirestore
    .collection(this.commenstCollection)
    .doc(comments.id)
    .delete()
  }
}
