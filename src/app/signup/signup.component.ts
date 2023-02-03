import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {  Storage,ref,uploadBytesResumable,getDownloadURL, FirebaseStorage,} from '@angular/fire/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.reset();
      return;
    }
    this.authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null) {
        this.router.navigate(['/dashboard/list-student']);
      } else if (result.isValid == false) {
        // this.router.navigate(['/signup']);
        // // this.firebaseErrorMessage = result.message;
        // console.log('login error', result);
      }
    });
  }

  // upload($event:any){
  //    this.path = $event.target.files[0]
  // }

  // uploadImage(){
  //   console.log(this.path)

  //   this.storage.upload("/files" + Math.random() + this.path,this.path)
  // }

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
