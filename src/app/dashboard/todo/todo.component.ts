import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Output() changeDone = new EventEmitter<any>();
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
    nowdate: [this.getCurentDate(), [Validators.required]],
    nameTodo: [this.nameTodo, [Validators.required]]
  })

  findeName(name){
    var item = this.newTaskList.find(item => item.name === name);
    console.log(item);
    return item;
  }

  addTask(){
    let taskName = this.myTask.controls['name'].value;
    if (taskName === 'Task already exist!'){return}
    if (this.findeName(taskName)){
      this.myTask = this.fb.group({
        name: ['Task already exist!', [Validators.required]],
        dateOfExecution: [''],
        priority: ['2', [Validators.required]],
        discription: [''],
        done: ['false', [Validators.required]],
        nowdate: [this.getCurentDate(), [Validators.required]],
        nameTodo: [this.nameTodo, [Validators.required]]
      })
      return}
    else {
      this.findeName(taskName);
      this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).set(this.myTask.value);
      this.myTask = this.fb.group({
        name: ['', [Validators.required]],
        dateOfExecution: [''],
        priority: ['2', [Validators.required]],
        discription: [''],
        done: ['false', [Validators.required]],
        nowdate: [this.getCurentDate(), [Validators.required]],
        nameTodo: [this.nameTodo, [Validators.required]],
      })
    }  
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
