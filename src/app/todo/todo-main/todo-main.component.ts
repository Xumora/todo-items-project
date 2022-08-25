import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit, OnDestroy {
  todos: Todo[] = []
  todosSub!: Subscription;
  loadingSub!: Subscription;
  isLoading = false;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.todoService.getTasks();
    })
    this.todosSub = this.todoService.todosChanged.subscribe((res: Todo[]) => {
      this.todos = res;
    })
    this.loadingSub = this.todoService.isLoading.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    })
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }

}
