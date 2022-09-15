import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { TodoEntityService } from 'src/app/services/todo-entity.service';
import { TodoState } from 'src/app/todo/reducers';
import { setEditedTodo } from 'src/app/todo/todo.actions';
import { Todo } from '../../../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(
    private todoEntityService: TodoEntityService,
    private store: Store<TodoState>
  ) {}

  public onCheck(event: MatCheckboxChange): void {
    if (event.checked) {
      this.todoEntityService.update({ ...this.todo, completed: true });
    } else {
      this.todoEntityService.update({ ...this.todo, completed: false });
    }
  }

  public onEdit(): void {
    this.store.dispatch(setEditedTodo({ editedTodo: this.todo }));
  }

  public onDeleteTodo(): void {
    this.todoEntityService.delete(this.todo.id);
  }
}
