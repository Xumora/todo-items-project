import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Todo } from '../todo/todo.model';
import { Observable, map, tap } from 'rxjs';
import { HandleErrorService } from './handle-error.service';
import { Update } from '@ngrx/entity';

@Injectable()
export class TodoDataService extends DefaultDataService<Todo> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private handleErrorService: HandleErrorService
  ) {
    super('Todo', http, httpUrlGenerator);
  }

  override getAll(): Observable<Todo[]> {
    console.log();
    return this.http
      .get<Todo[]>(
        'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      )
      .pipe(
        map(todos => {
          if (!todos) {
            return [];
          } else {
            return todos.filter(todo => todo !== null);
          }
        }),
        tap({
          error: error => {
            this.handleErrorService.handleError(error.statusText);
          },
        })
      );
  }

  override add(entity: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${entity.id}.json`,
        entity
      )
      .pipe(
        tap({
          error: error => {
            this.handleErrorService.handleError(error.statusText);
          },
        })
      );
  }

  override update(update: Update<Todo>): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${update.id}.json`,
        update.changes
      )
      .pipe(
        tap({
          error: error => {
            this.handleErrorService.handleError(error.statusText);
          },
        })
      );
  }

  override delete(key: string | number): Observable<string | number> {
    return this.http
      .delete<string | number>(
        `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${key}.json`
      )
      .pipe(
        tap({
          error: error => {
            this.handleErrorService.handleError(error.statusText);
          },
        })
      );
  }
}
