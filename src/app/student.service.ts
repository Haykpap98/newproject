import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 // private productsCollection = '/products';
  private studentsCollection = '/students';

  constructor(private angularFirestore: AngularFirestore) { }
  getStudentDoc(id: string){
    return this.angularFirestore
    .collection(this.studentsCollection)
    .doc(id)
    .valueChanges()
  }
  getStudentList(){
    return this.angularFirestore
    .collection(this.studentsCollection)
    .snapshotChanges()
  }
  createStudent(student: Student){
      this.angularFirestore
      .collection(this.studentsCollection)
      .add(student)
  }
  deleteStudent(student: any){
    return this.angularFirestore
    .collection(this.studentsCollection)
    .doc(student.id)
    .delete()
  }
  updateStudent(student: Student, id: any){
    return this.angularFirestore
    .collection(this.studentsCollection)
    .doc(id)
    .update({
      FirstName: student.FirstName,
      LastName: student.LastName,
      Contact: student.Contact,
      Email: student.Email
    })
  }
}
