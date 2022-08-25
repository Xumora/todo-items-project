import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.editSub = this.todoService.editMode.subscribe(boolean => {
      this.editMode = boolean;
      if (boolean) {
        this.newTodo.title = this.todoService.editTodo.title;
        this.newTodo.description = this.todoService.editTodo.description;
      }
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.todoService.editTask(this.newTodo)
    } else {
      this.todoService.addTask(this.newTodo)
    }
    this.onClear()
  }

  onClear() {
    this.todoService.editMode.next(false);
    this.todoForm.reset()
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe()
  }
}
