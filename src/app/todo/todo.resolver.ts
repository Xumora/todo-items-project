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
  constructor(private todoEntityService: TodoEntityService) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[]> {
    return this.todoEntityService.entities$.pipe(
      tap(() => this.todoEntityService.getAll()),
      first()
    );
  }
}
