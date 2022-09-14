import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoEntityService } from 'src/app/services/todo-entity.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnDestroy {
  @ViewChild('todoForm', { static: false }) todoForm!: NgForm;
  public editMode = false;
  public newTodo = {
    title: '',
    description: '',
  };
  public lastId!: string | number;
  public editedTodo!: Todo;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private todoEntityService: TodoEntityService,
    private todoService: TodoService
  ) { }

  public ngOnInit(): void {
    const editSub = this.todoService.editTodo.subscribe((todo: Todo) => {
      this.editMode = true;
      this.newTodo.title = todo.title;
      this.newTodo.description = todo.description;
      this.editedTodo = todo;
    });
    const lastIdSub = this.todoEntityService.keys$.subscribe(keys => {
      this.lastId = keys[keys.length - 1];
    });
    this.subscriptions.add(editSub);
    this.subscriptions.add(lastIdSub);
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.todoEntityService.update({
        id: this.editedTodo.id,
        ...this.newTodo,
        completed: this.editedTodo.completed,
      });
    } else {
      this.todoEntityService.add({
        id: (+this.lastId + 1).toString(),
        title: this.newTodo.title,
        description: this.newTodo.description,
        completed: false,
      });
    }
    this.onClear();
  }

  public onClear(): void {
    this.todoForm.reset();
    this.editMode = false;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
