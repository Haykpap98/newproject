import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import {  Storage,ref,uploadBytesResumable,getDownloadURL, FirebaseStorage,} from '@angular/fire/storage';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  path!: String;
  // public file: any = {};
  signupForm!: FormGroup;
  firebaseErrorMessage: string;
  // storage!: FirebaseStorage;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  value3!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private uploadService: FileUploadService
  ) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      mediaUrl: new FormControl(null, Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.reset();
      return;
    }
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService
          .pushFileToStorage(this.currentFileUpload)
          .then();
      }
    }
    this.authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null) {
        this.router.navigate(['/dashboard/list-student']);
      }
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // upload(): void {
  // if (this.selectedFiles) {
  //   const file: File | null = this.selectedFiles.item(0);
  //   this.selectedFiles = undefined;

  //   if (file) {
  //     this.currentFileUpload = new FileUpload(file);
  //     this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(

  //     );
  //   }
  // }
  // }

  // // upload($event:any){
  // //    this.path = $event.target.files[0]
  // // }

  // // uploadImage(){
  // //   console.log(this.path)

  // //   this.storage.upload("/files" + Math.random() + this.path,this.path)
  // // }

  // chooseFile($event: any) {
  //   this.file = $event.target.files[0];
  // }
  // addData() {
  //   const storageRef = ref(this.storage, 'files/' + this.file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, this.file);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) =>
  //         console.log('File available at', downLoadURL)
  //       );
  //     }
  //   );
  // }
}
