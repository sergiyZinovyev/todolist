import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';


export interface Item { id: string; name: string; };


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

newTodoList: any;
newTaskList: any;
newTask: any = {
  "dateOfExecution": "",
  "discription": "",
  "done": "",
  "name": "",
  "nowdate": "",
  "priority": ""
}
nameTodo: string;
nameTask: string;

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
    });

    //let todoDoc = this.afs.doc('users/'+this.auth.user);
    userDoc.collection('todolist').doc(this.nameTodo).collection(this.nameTodo).valueChanges().subscribe(taskList => {
      this.newTaskList = taskList;
      console.log(this.newTaskList);
    });

    //let todoDoc = this.afs.doc('users/'+this.auth.user);
    userDoc.collection('todolist').doc(this.nameTodo).collection(this.nameTodo).doc(this.nameTask).valueChanges().subscribe(task => {
      this.newTask = task;
      console.log(this.newTask);
    });



    console.log('dashboard user = '+this.auth.user);

  }

  myForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  myTask = this.fb.group({
    name: ['', [Validators.required]],
    dateOfExecution: [''],
    priority: ['2', [Validators.required]],
    discription: [''],
    done: ['false', [Validators.required]],
    nowdate: [this.getCurentDate(), [Validators.required]]
  })


  addList() {
    console.log(this.myForm.value);
    console.log(this.myForm.controls['name'].value);
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
    this.nameTodo = '';
    this.newTask = {};
    this.nameTask = '';
  }


  delTask(taskName) {
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).delete();
    this.newTask = {};
    this.nameTask = '';
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

  addTask(){
    let todoName = this.nameTodo;
    let taskName = this.myTask.controls['name'].value;

    this.afs.doc('users/'+this.auth.user+'/todolist/'+todoName+'/'+todoName+'/'+taskName).set(this.myTask.value);
  }

  getTask(name){
    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(this.nameTodo).collection(this.nameTodo).doc(name).valueChanges().subscribe(task => {
      this.newTask = task;
      this.nameTask = this.newTask.name;
      console.log(this.newTask);
    });
    
  }

  getCurentDate(){
    var now = new Date();
    var curr_date = ('0' + now.getDate()).slice(-2)
    var curr_month = ('0' + (now.getMonth() + 1)).slice(-2);
    var curr_year = now.getFullYear();
    var formated_date = curr_year + "-" + curr_month + "-" + curr_date;

    return formated_date;
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));




}
