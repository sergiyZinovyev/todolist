import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  @Input() nameTodo: string;
  nameTask: string;
  newTask: any;
  myclass: string;
  taskDone: string;

  myTask: any;
  

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
    
  }

  ngOnInit() {

  this.myTask = this.fb.group({
    name: [this.task.name, [Validators.required]],
    dateOfExecution: [this.task.dateOfExecution],
    priority: [this.task.priority, [Validators.required]],
    discription: [this.task.discription],
    done: [this.task.done, [Validators.required]],
    nowdate: [this.task.nowdate, [Validators.required]],
    nameTodo: [this.task.nameTodo, [Validators.required]],
  })

  this.taskDone = this.task.done;
  
  if(this.task.done == 'false'){
    this.myclass = this.numToColor(this.task.priority);
  }
  if(this.task.done == 'true'){
    this.myclass = 'grey';
  }
  
  // console.log(this.task.priority);
  // console.log(this.myclass);
  console.log(this.nameTodo);
  }


  

  delTask(taskName) {
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.task.nameTodo+'/'+this.task.nameTodo+'/'+taskName).delete();
    this.nameTask = '';
  }

  addTask(){
    let taskName = this.myTask.controls['name'].value;
    this.afs.doc('users/'+this.auth.user+'/todolist/'+this.task.nameTodo+'/'+this.task.nameTodo+'/'+taskName).set(this.myTask.value);
  }

  getTask(name){
    let todoDoc = this.afs.doc('users/'+this.auth.user);
    todoDoc.collection('todolist').doc(this.task.nameTodo).collection(this.task.nameTodo).doc(name).valueChanges().subscribe(task => {
      this.task = task;
      this.nameTask = this.task.name;
      console.log(this.task);
    });
    
  }

  editDone(){
    if(this.task.done == 'false'){
      this.myTask = this.fb.group({
        name: [this.task.name, [Validators.required]],
        dateOfExecution: [this.task.dateOfExecution],
        priority: [this.task.priority, [Validators.required]],
        discription: [this.task.discription],
        done: ['true', [Validators.required]],
        nowdate: [this.task.nowdate, [Validators.required]],
        nameTodo: [this.task.nameTodo, [Validators.required]],
      })
      this.addTask();
      this.getTask(this.task.name);
      //this.myclass = 'grey';
    }
    else{
      this.myTask = this.fb.group({
        name: [this.task.name, [Validators.required]],
        dateOfExecution: [this.task.dateOfExecution],
        priority: [this.task.priority, [Validators.required]],
        discription: [this.task.discription],
        done: ['false', [Validators.required]],
        nowdate: [this.task.nowdate, [Validators.required]],
        nameTodo: [this.task.nameTodo, [Validators.required]],
      })
      this.addTask();
      this.getTask(this.task.name);
      //this.myclass = this.numToColor(this.task.priority);
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

  numToColor (prop){
    var num = +prop;
    var col;
    switch(num){
      case 1: col = "red"; break;
      case 2: col = "blue"; break;
      case 3: col = "green"; break;
      default: col = "grey"; break;
    }
    return col;
  }
  
  
}
