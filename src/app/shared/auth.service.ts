import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string = 'user';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
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

  getAllTodoList(newTodoList){
    let newArr = [];
    newTodoList.forEach(element => {
      console.log('1'+newTodoList);
      let todoDoc = this.afs.doc('users/'+this.user);
      let i=0;
      todoDoc.collection('todolist').doc(element.name).collection(element.name).valueChanges().subscribe(taskList => {
        i = i+1;
        console.log('2|i='+i+' | '+taskList);
        if (i > 1){return}
        if (i==1){
          newArr = newArr.concat(taskList);
        }
        console.log('newArr = ' + newArr);
        //this.newTaskList = newArr;        
      });
      
    });
    //this.nameTodo = 'All tasks';
  }
}
