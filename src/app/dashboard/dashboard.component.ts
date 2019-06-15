import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Item { id: string; name: string; };


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

newTodoList: any;
newTaskList: any;
nameTodo: string;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    let userDoc = this.afs.doc('users/'+this.auth.user);
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
      console.log(this.newTodoList);
    });

    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(this.nameTodo).collection(this.nameTodo).valueChanges().subscribe(taskList => {
      this.newTaskList = taskList;
      console.log(this.newTaskList);
    })

    console.log('dashboard user = '+this.auth.user);

  }

  myForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  myTask = this.fb.group({
    name: ['', [Validators.required]],
    dateOfExecution: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    discription: ['', [Validators.required]],
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
  }


  delTask(taskName) {
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).delete();
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

  getCurentDate(){
    var now = new Date();
    var curr_date = now.getDate();
    var curr_month = now.getMonth() + 1;
    var curr_year = now.getFullYear();
    var formated_date = curr_year + "-" + curr_month + "-" + curr_date;

    return formated_date;
  }
}
