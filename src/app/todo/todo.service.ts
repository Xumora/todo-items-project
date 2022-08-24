import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "./todo.model";

@Injectable({ providedIn: 'root' }) export class TodoService {
    private todos: Todo[] = [];
    todosChanged = new Subject<Todo[]>();

    constructor(private http: HttpClient) { }

    addTask(title: string, description: string) {
        this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${this.todos.length}.json`,
            { title, description, completed: false },
        ).subscribe(res => {
            this.getTasks()
        })
    }

    getTasks() {
        this.http.get<Todo[]>(
            'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
        ).subscribe(res => {
            this.todos = res;
            this.todosChanged.next(this.todos)
        })
    }
}