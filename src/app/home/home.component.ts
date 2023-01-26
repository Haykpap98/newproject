import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Observable, timer} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  [x: string]: any;
  show:Boolean=false;
  constructor(
    public afAuth: AngularFireAuth,
    ){}
  
  ngOnInit(): void {
    // this.afAuth.user.pipe(timer(): new Observable<0>())
    setTimeout(() => {
      this.show=true
      
    }, 5000);
  
  }

  logout(): void{
     this.afAuth.signOut()

  }

}
