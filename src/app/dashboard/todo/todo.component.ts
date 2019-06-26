import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Output() changeAll = new EventEmitter<any>();
  @Output() changeDone = new EventEmitter<any>();
  @Output() getCurrentList = new EventEmitter<any>();
  @Input() newTaskList: any;
  @Input() nameTodo: string;
  @Input() color: string;
  nameTask: string;
  newTask: any;
  myTask: any;

  filtrParam: {column: string, direct: string} = {
    column: "dateOfExecution",
    direct: "desc"
  }

  nameDirect;
  dateOfExecutionDirect;
  priorityDirect;
  doneDirect;
  nowdateDirect;
  nameTodoDirect;

  //myTaskList;
  
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    
    console.log('ngOnInit/this.nameTodo = '+this.nameTodo);
    console.log('ngOnInit/this.newTaskList = '+this.newTaskList);
    this.myTask = this.fb.group({
      name: ['', [Validators.required]],
      dateOfExecution: [''],
      priority: ['2', [Validators.required]],
      discription: [''],
      done: ['false', [Validators.required]],
      nowdate: [this.getCurentDate(), [Validators.required]],
      nameTodo: [this.getNameTodo(), [Validators.required]],
      color: [this.color, [Validators.required]]
    })
    
  }

  // ngOnChanges(){
  //   this.myTaskList = this.newTaskList;
  //   console.log(' ngOnChanges/this.newTaskList ='+ this.newTaskList);
  // }
  
  get name() {return this.myTask.get('name')}
  get dateOfExecution() {return this.myTask.get('dateOfExecution')}
  get priority() {return this.myTask.get('priority')}
  get discription() {return this.myTask.get('discription')}
  get done() {return this.myTask.get('done')}

  getNameTodo(){
    console.log('this.nameTodo = '+this.nameTodo);
    return this.nameTodo;
  }

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
        nameTodo: [this.getNameTodo(), [Validators.required]],
        color: [this.color, [Validators.required]]
      })
      return}
    else {
      console.log('addTask/this.nameTodo = '+this.nameTodo);
      this.myTask = this.fb.group({
        name: [this.name.value, [Validators.required]],
        dateOfExecution: [this.dateOfExecution.value],
        priority: [this.priority.value, [Validators.required]],
        discription: [this.discription.value],
        done: [this.done.value, [Validators.required]],
        nowdate: [this.getCurentDate(), [Validators.required]],
        nameTodo: [this.getNameTodo(), [Validators.required]],
        color: [this.color, [Validators.required]]
      });
      this.findeName(taskName);
      this.afs.doc('users/'+this.auth.user+'/todolist/'+this.nameTodo+'/'+this.nameTodo+'/'+taskName).set(this.myTask.value);
      this.myTask = this.fb.group({
        name: ['', [Validators.required]],
        dateOfExecution: [''],
        priority: ['2', [Validators.required]],
        discription: [''],
        done: ['false', [Validators.required]],
        nowdate: [this.getCurentDate(), [Validators.required]],
        nameTodo: [this.getNameTodo(), [Validators.required]],
        color: [this.color, [Validators.required]]
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


  getAll(){
    console.log('test get All');
    this.changeAll.emit('id');
  }

  changeFiltr(colName: string){
    this.filtrParam.column = colName;

    switch(colName){
      case 'name': {
        this.dateOfExecutionDirect = '';
        this.priorityDirect = '';
        this.doneDirect = '';
        this.nowdateDirect = '';
        this.nameTodoDirect = '';
        if(this.filtrParam.direct == "asc"){this.nameDirect = '↓'}
        else{this.nameDirect = '↑'}
        break;
      }
      case 'dateOfExecution': {
        this.nameDirect = '';
        this.priorityDirect = '';
        this.doneDirect = '';
        this.nowdateDirect = '';
        this.nameTodoDirect = '';
        if(this.filtrParam.direct == "asc"){this.dateOfExecutionDirect = '↓'}
        else{this.dateOfExecutionDirect = '↑'}
        break;
      }
      case 'priority': {
        this.dateOfExecutionDirect = '';
        this.nameDirect = '';
        this.doneDirect = '';
        this.nowdateDirect = '';
        this.nameTodoDirect = '';
        if(this.filtrParam.direct == "asc"){this.priorityDirect = '↓'}
        else{this.priorityDirect = '↑'}
        break;
      }
      case 'done': {
        this.dateOfExecutionDirect = '';
        this.priorityDirect = '';
        this.nameDirect = '';
        this.nowdateDirect = '';
        this.nameTodoDirect = '';
        if(this.filtrParam.direct == "asc"){this.doneDirect = '↓'}
        else{this.doneDirect = '↑'}
        break;
      }
      case 'nowdate': {
        this.dateOfExecutionDirect = '';
        this.priorityDirect = '';
        this.doneDirect = '';
        this.nameDirect = '';
        this.nameTodoDirect = '';
        if(this.filtrParam.direct == "asc"){this.nowdateDirect = '↓'}
        else{this.nowdateDirect = '↑'}
        break;
      }
      case 'nameTodo': {
        this.dateOfExecutionDirect = '';
        this.priorityDirect = '';
        this.doneDirect = '';
        this.nowdateDirect = '';
        this.nameDirect = '';
        if(this.filtrParam.direct == "asc"){this.nameTodoDirect = '↓'}
        else{this.nameTodoDirect = '↑'}
        break;
      }
      
    }
    
    
    if(this.filtrParam.direct == "desc"){
      this.filtrParam.direct = "asc"
    }
    else{
      this.filtrParam.direct = "desc"
    }
  console.log(this.filtrParam);
  if (this.nameTodo == 'All tasks'){this.getAll();}
  else{this.getCurrentList.emit(this.nameTodo);}
  
  }


}
