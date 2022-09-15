import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todo');
export const editedTodo = createSelector(
  selectTodoState,
  todo => todo.editedTodo
);
