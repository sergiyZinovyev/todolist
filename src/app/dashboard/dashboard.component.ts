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
  color: any;
  newColor = '#ccf2ff';
  isShown: boolean = false;
  
  lang = this.auth.curentLang;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnInit() {
    let userDoc = this.afs.doc('users/'+this.auth.user);
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
      console.log('dashboard.component/ngOInit/this.newTodoList = '+this.newTodoList);
      this.getAllTodoList();
    });

    console.log('dashboard user = '+this.auth.user);

    this.auth.lang.subscribe({
      next: (value: string) => {
        this.lang = value;
      }
    })
    
  }

  myForm = this.fb.group({
    name: ['', [Validators.required]],
    color: ['#ccf2ff', [Validators.required]],
  })

  get myFormName() {return this.myForm.get('name')}
  get myFormColor() {return this.myForm.get('color')}
  

  addList() {
    let todoName = this.myForm.controls['name'].value;
    this.afs.doc('users/'+this.auth.user+'/todolist/'+todoName).set(this.myForm.value);
  }

  editList(nameList){
    console.log('data: ');
    console.log(this.myForm.value);
    console.log('name:'+nameList);
    let data = {
      name: nameList,
      color: this.newColor,
    }
    console.log(data);
    this.afs.doc('users/'+this.auth.user+'/todolist/'+nameList).set(data);
    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(nameList).collection(nameList).valueChanges().subscribe(taskList => {
      taskList.forEach(element => {
        this.afs.doc('users/'+this.auth.user+'/todolist/'+nameList+'/'+nameList+'/'+element.name).set({
          name: element.name,
          dateOfExecution: element.dateOfExecution,
          priority: element.priority,
          discription: element.discription,
          done: element.done,
          nowdate: element.nowdate,
          nameTodo: element.nameTodo,
          color: this.newColor});
        console.log(element);
      });
    })
  }

  getCurrentColor(nameList){
    this.afs.doc('users/'+this.auth.user+'/todolist/'+nameList).valueChanges().subscribe(list =>{
      console.log(list);
    })

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
      console.log('dashboard.component/getList/this.newTaskList = '+this.newTaskList);
    })
    this.newTodoList.forEach(element => {
      if (element.name == name){
        this.color = element.color
      }
    })
    //console.log(this.color);
  }

 
  getAllTodoList(){
    let newArr = [];
    this.newTodoList.forEach(element => {
      //console.log('1'+this.newTodoList);
      let todoDoc = this.afs.doc('users/'+this.auth.user);
      let i=0;
      todoDoc.collection('todolist').doc(element.name).collection(element.name).valueChanges().subscribe(taskList => {
        i = i+1;
        //console.log('2|i='+i+' | '+taskList);
        if (i > 1){return}
        if (i==1){
          newArr = newArr.concat(taskList);
        }
        //console.log('newArr = ' + newArr);
        this.newTaskList = newArr;        
      });
      
    });
    this.nameTodo = 'All tasks';
  }
 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }






}
