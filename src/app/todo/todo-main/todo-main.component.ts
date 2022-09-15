import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo.model';
import { TodoEntityService } from 'src/app/services/todo-entity.service';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public isLoading: boolean = false;
  public subscriptions = new Subscription();

  constructor(
    private todoEntityService: TodoEntityService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const todosSub = this.todoEntityService.entities$.subscribe(todos => {
      this.initializeComponent(todos);
    });
    const loadingSub = this.todoEntityService.loading$.subscribe(
      loadingStatus => (this.isLoading = loadingStatus)
    );
    this.subscriptions.add(loadingSub);
    this.subscriptions.add(todosSub);
  }

  public initializeComponent(todos: Todo[]): void {
    if (this.route.snapshot.params['todoType'] === 'todos') {
      this.todos = todos.filter(todo => !todo.completed);
    } else if (this.route.snapshot.params['todoType'] === 'completed') {
      this.todos = todos.filter(todo => todo.completed);
    } else if (this.route.snapshot.params['todoType'] === 'all') {
      this.todos = todos;
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
