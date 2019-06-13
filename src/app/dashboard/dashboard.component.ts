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

private itemsCollection: AngularFirestoreCollection<Item>;
//items: Observable<Item[]>;

newTodoList: any;
newTaskList: any;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) { 
    this.itemsCollection = afs.collection<Item>('items');
    //this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    let userDoc = this.afs.doc('users/user');
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
      console.log(this.newTodoList);
    });
    // let todoDoc = this.afs.doc('users/user/todolist/todo1');
    // todoDoc.collection('todo1').valueChanges().subscribe(taskList => {
    //   this.newTaskList = taskList;
    //   console.log(this.newTaskList);
    // });
    let todoDoc = this.afs.doc('users/user');
    todoDoc.collection('todolist').doc('todo1').collection('todo1').valueChanges().subscribe(taskList => {
      this.newTaskList = taskList;
      console.log(this.newTaskList);
    })


  }

  myForm = this.fb.group({
    //id: ['', [Validators.required]],
    name: ['', [Validators.required]]
  })

  myTask = this.fb.group({
    name: ['', [Validators.required]]
  })


  addList() {
    console.log(this.myForm.value);
    console.log(this.myForm.controls['name'].value);
    let todoName = this.myForm.controls['name'].value;
    //this.afs.doc('users/user/todolist/'+todoName).set(this.myForm.value);
    this.afs.doc('users/user/todolist/'+todoName).set(this.myForm.value);
  }

  delList(taskName) {
    this.afs.doc('users/user/todolist/'+taskName).delete();
  }
  delTask(taskName) {
    this.afs.doc('users/user/todolist/todo1/todo1/'+taskName).delete();
  }
  getList(){
    console.log('test');
    let userDoc = this.afs.doc('users/user');
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
    });
    console.log(this.newTodoList)
  }

  addTask(){
    ///////////////
    

    
    // Persist a document id
    // let name = this.myTask.controls['name'].value;
    // const id = this.afs.createId();
    // const item: Item = { id, name };
    // this.itemsCollection.doc('todo3').set(item);
    // console.log('test');

    let todoName = 'todo1';
    let taskName = this.myTask.controls['name'].value;
    this.afs.doc('users/user/todolist/'+todoName+'/'+todoName+'/'+taskName).set(this.myTask.value);
  }
}
