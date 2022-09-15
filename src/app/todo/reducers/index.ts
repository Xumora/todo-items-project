import { createReducer, on } from '@ngrx/store';
import { setEditedTodo } from '../todo.actions';
import { Todo } from '../todo.model';

export const todoFeatureKey = 'todo';

export interface TodoState {
  editedTodo: Todo | null;
}

export const initialAuthState: TodoState = {
  editedTodo: null,
};

export const todoReducer = createReducer(
  initialAuthState,
  on(setEditedTodo, (state, action) => {
    return { editedTodo: action.editedTodo };
  })
);
