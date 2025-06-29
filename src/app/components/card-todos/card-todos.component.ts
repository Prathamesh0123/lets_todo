import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { Task } from 'src/app/models/task';
import { take } from 'rxjs';
interface todo {
  _id:number,
  title:string,
  task:string,
  completed?:boolean
}
@Component({
  selector: 'app-card-todos',
  templateUrl: './card-todos.component.html',
  styleUrls: ['./card-todos.component.css']
})

export class CardTodosComponent {
   constructor(private taskService:TodoServiceService){}
    tasks:todo[] = [];
    showLoading:boolean = false;
    completed:boolean = false;
    filter:string = 'all';
    ngOnInit(): void {
      this.loadTasks();
    }
  
    editingTaskId:number | null = null;
    editingTitle!:string;
    editingTask!:string;
  
 
    
  loadTasks(): void {
  this.showLoading = true;
  this.taskService.getTodo(this.filter).subscribe({
    next: (res) => {
      this.tasks = res.todos;
      this.showLoading = false;
    },
    error: (err) => {
      console.log('no todos', err);
    }
  });
}

onFilterChange(event:Event){
  const target = event.target as HTMLSelectElement;
  this.filter = target.value;
  this.loadTasks();
}


  done(taskId: number){

    const selectedTask = this.tasks.find((t)=>{
      return t._id == taskId;
    })

    if(selectedTask && !selectedTask.completed){
        this.taskService.done(taskId).subscribe({
        next:(res)=>{
          console.log(res);
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error:(err)=>{
          console.log(err.message);
        }
      })
    }
 
  }
  
    edit(taskObj:any){
      this.editingTaskId = taskObj._id;
      this.editingTitle = taskObj.title;
      this.editingTask = taskObj.task;
    }
  
  updateTask() {
    const data = {
      taskId : this.editingTaskId,
      title : this.editingTitle,
      task : this.editingTask
    }
    const todoExist = this.tasks.find((t)=>{
      return t.title == data.title && t._id != data.taskId;
    });

    if(todoExist){
      alert('todo alredy exist!!!');
      return;
    }


    this.taskService.updateTodo(data).subscribe({
      next:()=>{
        alert('Todo Updated!!!');
        this.editingTaskId = null;
        this.ngOnInit();
      },
      error:(err)=>{
        alert(err.error.message);
      }
    })
  }
  
  deleteTodo(taskId:number){
    console.log(taskId);
    this.taskService.deleteTodo(taskId).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.loadTasks();
      },
      error:(err)=>{
        alert(err.error.message);
      }
    });
  }

}
