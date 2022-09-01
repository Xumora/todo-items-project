import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { mergeMap, Subscription } from 'rxjs';
import { Todo } from '../../todo.model';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  @ViewChild('todoForm', { static: false }) todoForm!: NgForm;
  editSub!: Subscription;
  editMode = false;
  newTodo = {
    title: '',
    description: '',
  }

  editedTodo!: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.editSub = this.todoService.editTodo.subscribe((todo: Todo) => {
      this.editMode = true;
      this.newTodo.title = todo.title;
      this.newTodo.description = todo.description;
      this.editedTodo = todo;
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.todoService.editTask({ id: this.editedTodo.id, ...this.newTodo, completed: this.editedTodo.completed }).pipe(
        mergeMap(() => this.todoService.getTasks())
      ).subscribe()
    } else {
      this.todoService.addTask(this.newTodo).pipe(
        mergeMap(() => this.todoService.getTasks())
      ).subscribe()
    }
    this.onClear()
  }

  onClear() {
    this.todoForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe()
  }
}
