import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoAppComponent } from './components/to-do-app/to-do-app.component';
import { CardTodosComponent } from './components/card-todos/card-todos.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  {path:'',component:SignupFormComponent},
  {path:'home',component:ToDoAppComponent,canActivate:[authGuard]},
  {path:'todos',component:CardTodosComponent,canActivate:[authGuard]},
  {path:'login',component:SigninFormComponent},
  {path:'signup',component:SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
