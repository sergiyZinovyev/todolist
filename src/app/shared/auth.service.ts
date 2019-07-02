import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string = 'user';
  //lang = new Subject();
  //lang: string = 'en';
  // lang = Observable.create((observer: Observer<string>) =>{
  //   observer.next('en')
  // })
  //newLang = 'en';

  lang = new Subject();
  curentLang = 'en';
  errorMessage = '';
  errorMessage2 = '';

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

  getLang(lang){
    this.lang.next(lang);
    this.curentLang = lang;
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
      .catch( er => {
        console.log(er);
        console.log(er.message);
        this.errorMessage = er.message;
      })
      
      
  
      // this.afAuth.auth.currentUser.sendEmailVerification()
      // .then(function() {
      //   console.log("send: work");
      // })
      // .catch(er => {
      //   console.log(er);
      //   console.log(er.message);
      //   //this.errorMessage = er.message;
      // });
      
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
      .catch( er => {
        console.log(er);
        this.errorMessage2 = er.message;
      })
  }

  logout() {
    this.afAuth.auth.signOut().then(
      _ => {
        this.user = 'user';
        this.router.navigate(['/home']);
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
