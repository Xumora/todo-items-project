import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";

@Injectable({ providedIn: 'root' }) export class TodoService {
    private todos: Todo[] = [
        { title: 'Test1', description: 'Testing', completed: false },
        { title: 'Test2', description: 'Testing', completed: true },
        { title: 'Test3', description: 'Testing', completed: false },
        { title: 'Test4', description: 'Testing', completed: false },
        { title: 'Test5', description: 'Testing', completed: true },
    ]

    getTodoTasks() {
        return this.todos.filter(todo => !todo.completed)
    }

    getCompletedTasks() {
        return this.todos.filter(todo => todo.completed)
    }
}