import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoggedIn: boolean;     

    constructor(private router: Router, private afAuth:  AngularFireAuth) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user: any) => {             
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    loginUser(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email, password)
          .then(() => {
              console.log('Auth Service: loginUser: success');
          
          })
          .catch((error:any) => {          
                  return { isValid: false, message: error.message };
          });
  }


    signupUser(user: any): Promise<any> {
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
          .then((result) => {
              result.user?.sendEmailVerification();                   
          })
          .catch(error => {    
                  return { isValid: false, message: error.message };
          });
  }

  getCurrentUser(){
    return this.afAuth.user
   
  }
  
}
