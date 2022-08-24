import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit, OnDestroy {
  todoTasks: Todo[] = [];
  completedTasks: Todo[] = [];
  todoSub!: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTasks();
    this.todoSub = this.todoService.todosChanged.subscribe((todosRes: Todo[]) => {
      this.todoTasks = todosRes.filter(todo => !todo.completed);
      this.completedTasks = todosRes.filter(todo => todo.completed);
    })
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }

}
