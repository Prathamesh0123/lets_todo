import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, filter, map ,Observable,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private task:Task[] = [];
  constructor(private http:HttpClient){}
  //to get Data from Task Array
  getTask():Task[]{
    return [...this.task];
  }

  //add new task
  addTask(task:any):Observable<boolean>{
    const token = localStorage.getItem('token');      
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
    
    return this.http.post('http://localhost:3000/api/addtodo',task,{headers}).pipe(
      map((res:any)=>{
        alert(res.message);
        console.log(res.message);
        return true;
      }),
      catchError((err)=>{
        alert(err.error.message);
        console.log(err.error.message);

        return of(false)
      })
    )
  }

  getTodo(filter:string){
    const token = localStorage.getItem('token');
    const params = new HttpParams()
    .set('filter',filter);
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get('http://localhost:3000/api/todos',{params,headers}).pipe(
      map((res)=>{
        return res;
      }),
      catchError((err)=>{
        console.log('err',err.error.message);
        
        return of(err)
      })
    )
  } 

  updateTodo(todo:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    });
    return this.http.put(
      `http://localhost:3000/api/todos/${todo.taskId}`,{
        title:todo.title,
        task:todo.task
      },
      {headers}
    );
  }

  done(taskId:number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    });
    return this.http.put(
      `http://localhost:3000/api/todos/${taskId}`,
      {
        completed:true
      },
      {headers}
    );
  }

  deleteTodo(taskId:number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });

    return this.http.delete(`http://localhost:3000/api/todo/${taskId}`,{headers});
  }
}
  