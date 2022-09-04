import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { mergeMap, Subscription } from 'rxjs';
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
  errorSub!: Subscription;
  errorMessage: any = null;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((params: Params) => this.todoService.getTasks())
    ).subscribe()

    this.todosSub = this.todoService.todosChanged.subscribe((res: Todo[]) => {
      if (this.route.snapshot.params['todoType'] === 'todos') {
        this.todos = res.filter(todo => !todo.completed);
      } else if (this.route.snapshot.params['todoType'] === 'completed') {
        this.todos = res.filter(todo => todo.completed);
      } else if (this.route.snapshot.params['todoType'] === 'all') {
        this.todos = res;
      }
    })
    this.loadingSub = this.todoService.isLoading.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    })
    this.errorSub = this.todoService.errorMes.subscribe(err => {
      this.errorMessage = err;
    })
  }

  closeModal() {
    this.todoService.errorMes.next(null);
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
    this.loadingSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
