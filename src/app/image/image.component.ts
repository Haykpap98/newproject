import { Component,  } from '@angular/core';
import { FormGroup,  } from '@angular/forms';
import {  ref,uploadBytesResumable,getDownloadURL, FirebaseStorage,} from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  path!: String;
  public file: any = {};
  signupForm!: FormGroup;
  firebaseErrorMessage: string;
  storage!: FirebaseStorage;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.firebaseErrorMessage = '';
  }

  chooseFile($event: any) {
    this.file = $event.target.files[0];
  }
  addData() {
    const storageRef = ref(this.storage, 'files/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) =>
          console.log('File available at', downLoadURL)
        );
      }
    );
  }
}
