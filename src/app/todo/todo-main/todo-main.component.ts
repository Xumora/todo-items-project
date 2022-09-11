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
  public todosSub!: Subscription;
  public isLoading: boolean = false;
  public loadingSub!: Subscription;

  constructor(
    private todoDataService: TodoEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todosSub = this.todoDataService.entities$.subscribe(todos => {
      if (this.route.snapshot.params['todoType'] === 'todos') {
        this.todos = todos.filter(todo => !todo.completed);
      } else if (this.route.snapshot.params['todoType'] === 'completed') {
        this.todos = todos.filter(todo => todo.completed);
      } else if (this.route.snapshot.params['todoType'] === 'all') {
        this.todos = todos;
      }
    });
    this.loadingSub = this.todoDataService.loading$.subscribe(
      loadingStatus => (this.isLoading = loadingStatus)
    );
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
