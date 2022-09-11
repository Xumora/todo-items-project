import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap, first } from 'rxjs';
import { TodoEntityService } from '../services/todo-entity.service';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<Todo[]> {
  constructor(private todoService: TodoEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[]> {
    return this.todoService.entities$.pipe(
      tap(() => this.todoService.getAll()),
      first()
    );
  }
}
