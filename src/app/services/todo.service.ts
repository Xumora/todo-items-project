import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../todo/todo.model";

@Injectable({ providedIn: 'root' }) export class TodoService {
    editTodo = new Subject<Todo>();
}