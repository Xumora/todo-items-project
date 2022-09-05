import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { mergeMap } from 'rxjs';
import { Todo } from 'src/app/todo/todo.model';
import { TodoService } from 'src/app/todo/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void { }

  onCheck(event: MatCheckboxChange) {
    if (event.checked) {
      this.todoService.changeStatus(this.todo, true).pipe(
        mergeMap(() => this.todoService.getTasks())
      ).subscribe()
    } else {
      this.todoService.changeStatus(this.todo, false).pipe(
        mergeMap(() => this.todoService.getTasks())
      ).subscribe()
    }
  }

  onEdit() {
    this.todoService.editTodo.next({ ...this.todo });
  }

  onDeleteTodo() {
    this.todoService.deleteTask(this.todo.id).pipe(
      mergeMap(() => this.todoService.getTasks())
    ).subscribe();
  }

}
