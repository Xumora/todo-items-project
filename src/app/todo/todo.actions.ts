import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const setEditedTodo = createAction(
  '[Todo] Edit Todo',
  props<{ editedTodo: Todo | null }>()
);
