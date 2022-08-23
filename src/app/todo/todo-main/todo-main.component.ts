import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {
  todoLists = ['To Do', 'Completed']

  constructor() { }

  ngOnInit(): void {
  }

}
