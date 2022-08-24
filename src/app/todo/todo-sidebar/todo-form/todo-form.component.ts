import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @ViewChild('todoForm', { static: false }) todoForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
