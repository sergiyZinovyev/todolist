import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, concat } from 'rxjs';


import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';


export interface Item { id: string; name: string; };


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  newTodoList: any;
  newTaskList: any;
  nameTodo: string;
  //newArr;


  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnInit() {
    let userDoc = this.afs.doc('users/'+this.auth.user);
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
      console.log(this.newTodoList);
      this.getAllTodoList();
    });

    console.log('dashboard user = '+this.auth.user);

    
  }

  myForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  // myTask = this.fb.group({
  //   name: ['', [Validators.required]],
  //   dateOfExecution: [''],
  //   priority: ['2', [Validators.required]],
  //   discription: [''],
  //   done: ['false', [Validators.required]],
  //   nowdate: [this.getCurentDate(), [Validators.required]]
  // })


  addList() {
    let todoName = this.myForm.controls['name'].value;
    this.afs.doc('users/'+this.auth.user+'/todolist/'+todoName).set(this.myForm.value);
  }



  delList(todoName) {
    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(todoName).collection(todoName).valueChanges().subscribe(taskList => {
      taskList.forEach(element => {
        this.afs.doc('users/'+this.auth.user+'/todolist/'+todoName+'/'+todoName+'/'+element.name).delete();
      });
    })
    this.afs.doc('users/'+this.auth.user+'/todolist/'+todoName).delete();
    this.newTodoList = {};
    this.nameTodo = 'All tasks';
  }




  getList(name){
    console.log(name);
    this.nameTodo = name;
    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(this.nameTodo).collection(this.nameTodo).valueChanges().subscribe(taskList => {
      this.newTaskList = taskList;
      console.log(this.newTaskList);
    })
  }

 
  getAllTodoList(){
    let newArr = [];
    this.newTodoList.forEach(element => {
      console.log('1'+this.newTodoList);
      let todoDoc = this.afs.doc('users/'+this.auth.user);
      let i=0;
      todoDoc.collection('todolist').doc(element.name).collection(element.name).valueChanges().subscribe(taskList => {
        i = i+1;
        console.log('2|i='+i+' | '+taskList);
        if (i > 1){return}
        if (i==1){
          newArr = newArr.concat(taskList);
        }
        console.log('newArr = ' + newArr);
        this.newTaskList = newArr;        
      });
      
    });
    this.nameTodo = 'All tasks';
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }






}
