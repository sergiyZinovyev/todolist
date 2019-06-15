import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string = 'user';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.afAuth.authState.subscribe(
      user => {
        console.log(user);
        console.log(user.email);
        this.user = user.email;
      }
    )
    console.log(this.user);
  }

  registrationUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( user => {
        console.log(user);
        this.afAuth.authState.subscribe(
          user => {
            this.user = user.email;
          }
        )
        this.router.navigate(['/dashboard']);
      } )
      .catch( er => console.log(er))
  }

  loginUser(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then( user => {
        console.log(user);
        this.afAuth.authState.subscribe(
          user => {
            this.user = user.email;
          }
        )
        this.router.navigate(['/dashboard']);
      })
      .catch( er => console.log(er))
  }

  logout() {
    this.afAuth.auth.signOut().then(
      _ => {
        this.user = 'user';
        this.router.navigate(['/user/login']);
      }
    );

  }
}
