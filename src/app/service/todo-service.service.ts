import { Injectable } from '@angular/core';
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private task:Task[] = [];

  //to get Data from Task Array
  getTask():Task[]{
    return [...this.task];
  }

  //add new task
  addTask(newTask:Task){
    const data = [...this.task,newTask];
    // this.task.push(newTask);//not recomnded chnaging orignal data...
    this.task = data;
  }
  
  deleteTodo(taskId:number){
    const data = this.task.filter((t)=>{
      return t.id != taskId;
    });
    this.task = data;
    // this.task.splice(taskId,1);//not recomnded it will chnage oringnal array   
  }

  updateTask(updated:Task){
    this.task = this.task.map(task=>
       task.id == updated.id ? {...task,...updated} : task
    );
  }
}
  