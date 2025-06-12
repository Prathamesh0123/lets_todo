import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-card-todos',
  templateUrl: './card-todos.component.html',
  styleUrls: ['./card-todos.component.css']
})
export class CardTodosComponent {
   constructor(private taskService:TodoServiceService){}
    tasks:Task[] = [];
  
    ngOnInit(): void {
      this.tasks = this.getData();
    }
  
    editingTaskId:number | null = null;
    editingTitle!:string;
    editingTask!:string;
  
    getData():Task[]{
      return this.taskService.getTask();
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
