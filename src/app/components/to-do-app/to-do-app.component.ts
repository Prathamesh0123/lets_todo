import { Component,OnInit} from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-to-do-app',
  templateUrl: './to-do-app.component.html',
  styleUrls: ['./to-do-app.component.css']
})
export class ToDoAppComponent implements OnInit{
  constructor(private taskService:TodoServiceService){}
  tasks:Task[] = [];

  ngOnInit(): void {
      this.tasks = this.getData();
  }
  
  newTask:string = '';
  title:string = '';

  editingTaskId:number | null = null;
  editingTitle!:string;
  editingTask!:string;

  getData():Task[]{
    return this.taskService.getTask();
  }
  
  addTask(){
    let titleExist = this.tasks.some(task => task.title == this.title.toLowerCase());    
    if(this.newTask.trim() != '' && this.title.trim() != ''){
      if(titleExist){
        alert('the todo already exist!!!');
        return;
      }
      const pushtask:Task = {
        id:Date.now(),
        title:this.title.toLowerCase(),
        task:this.newTask,
        completed:false
      }
        this.taskService.addTask(pushtask);
        // this.tasks.push(pushtask);
        this.tasks = this.getData();
        alert('task is Added!!!');
        this.newTask = '';
        this.title = '';
  
    }else{
      alert('all fields must be fill!!!');
    }
  }

done(taskId: number) {
  const task = this.tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
  }
}


  edit(taskObj:Task){
    this.editingTaskId = taskObj.id;
    this.editingTitle = taskObj.title;
    this.editingTask = taskObj.task;
  }

updateTask(taskId: number) {
  //this will return object / reference same reference of orignal tasks so 
  //any chnages is in task would like chnages in orignal there is no seperate copy 
  //unless we manually do that...
  // const task = this.tasks.find(t => t.id === taskId);
  // if (task) {
  //   task.title = this.editingTitle;
  //   task.task = this.editingTask;
  //   this.editingTaskId = null;
  // }
  const updateTask = {
    id:taskId,
    title:this.editingTitle,
    task:this.editingTask,
    completed:false
  }
  
  let isTaskAlreadyExist = this.tasks.some((t)=>{
    return t.title == updateTask.title && t.id != taskId;
  });

  if(isTaskAlreadyExist){
    alert('The task alredy exist!!!');
    return;
  }

  this.taskService.updateTask(updateTask);
  this.editingTaskId = null;
  this.tasks = this.getData();
}

deleteTodo(taskId:number){
  this.taskService.deleteTodo(taskId);
  // this.tasks = this.taskService.getTask();
  this.tasks = this.getData();
  alert('todo deleted!!!');  
}
}