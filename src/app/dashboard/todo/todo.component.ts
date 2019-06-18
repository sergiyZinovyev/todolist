import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

export interface Item { id: string; name: string; };


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() newTaskList: any;
  @Input() nameTodo: string;
  nameTask: string;
  newTask: any;
 
  
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
  }


  myTask = this.fb.group({
    name: ['', [Validators.required]],
    dateOfExecution: [''],
    priority: ['2', [Validators.required]],
    discription: [''],
    done: ['false', [Validators.required]],
    nowdate: [this.getCurentDate(), [Validators.required]]
  })

  delTask(taskName) {
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).delete();
    this.nameTask = '';
  }

  addTask(){
    let taskName = this.myTask.controls['name'].value;
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).set(this.myTask.value);
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


}
