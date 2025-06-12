import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoAppComponent } from './components/to-do-app/to-do-app.component';
import { CardTodosComponent } from './components/card-todos/card-todos.component';

const routes: Routes = [
  {path:'',component:ToDoAppComponent},
  {path:'todos',component:CardTodosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
