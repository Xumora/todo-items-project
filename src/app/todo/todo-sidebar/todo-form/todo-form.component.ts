import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @ViewChild('todoForm', { static: false }) todoForm!: NgForm;
  editMode: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.editMode) {

    } else {
      this.todoService.addTask(this.todoForm.value.title, this.todoForm.value.description)
    }
  }
}
