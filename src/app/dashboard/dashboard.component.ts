import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

newTodoList: any;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let userDoc = this.afs.doc('users/user');
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
    });
  }

  myForm = this.fb.group({
    //id: ['', [Validators.required]],
    name: ['', [Validators.required]]
  })


  addList() {
    console.log(this.myForm.value);
    console.log(this.myForm.controls['name'].value);
    let taskName = this.myForm.controls['name'].value;
    this.afs.doc('users/user/todolist/'+taskName).set(this.myForm.value);
  }

  delList(taskName) {
    this.afs.doc('users/user/todolist/'+taskName).delete();
  }

  getList(){
    console.log('test');
    let userDoc = this.afs.doc('users/user');
    userDoc.collection('todolist').valueChanges().subscribe(todoList => {
      this.newTodoList = todoList;
    });
    console.log(this.newTodoList)
  }
}
