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
  public editSub!: Subscription;
  public editMode = false;
  public newTodo = {
    title: '',
    description: '',
  };
  public lastIdSub!: Subscription;
  public lastId!: string | number;
  public editedTodo!: Todo;

  constructor(
    private todoDataService: TodoEntityService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.editSub = this.todoService.editTodo.subscribe((todo: Todo) => {
      this.editMode = true;
      this.newTodo.title = todo.title;
      this.newTodo.description = todo.description;
      this.editedTodo = todo;
    });
    this.lastIdSub = this.todoDataService.keys$.subscribe(keys => {
      this.lastId = keys[keys.length - 1];
    });
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.todoDataService.update({
        id: this.editedTodo.id,
        ...this.newTodo,
        completed: this.editedTodo.completed,
      });
    } else {
      this.todoDataService.add({
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

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
    this.lastIdSub.unsubscribe();
  }
}
