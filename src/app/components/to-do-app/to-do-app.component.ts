import { Component} from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
@Component({
  selector: 'app-to-do-app',
  templateUrl: './to-do-app.component.html',
  styleUrls: ['./to-do-app.component.css']
})
export class ToDoAppComponent{
  constructor(private todoService:TodoServiceService){}

  newTask:string = '';
  title:string = '';
  completed:boolean = false

  
  addTask(){
    const data = {
      title:this.title,
      task:this.newTask,
      completed:this.completed
    }

    this.todoService.addTask(data).subscribe({
      next:(res)=>{
        if(res){
          this.title = '';
          this.newTask = '';
          // alert('todo added into database');
        }else{
          // alert('somthing went wrong!!!');
        }
      }
    })
  }
}