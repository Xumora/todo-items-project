import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoMainComponent } from './todo/todo-main/todo-main.component';
import { TodoResolver } from './todo/todo.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: ':todoType', component: TodoMainComponent, resolve: { todos: TodoResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
