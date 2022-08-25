import { Component, Input, OnInit } from '@angular/core';
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

  onCheck(event: any) {
    if (event.checked) {
      this.todoService.changeStatus(this.todo, true)
    } else {
      this.todoService.changeStatus(this.todo, false)
    }
  }

  onEdit() {
    this.todoService.editTodo = this.todo;
    this.todoService.editMode.next(true);
  }

  onDeleteTodo() {
    this.todoService.deleteTask(this.todo.id)
  }

}
