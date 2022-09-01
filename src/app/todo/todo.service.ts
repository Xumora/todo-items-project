import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject, tap } from "rxjs";
import { Todo } from "./todo.model";

@Injectable({ providedIn: 'root' }) export class TodoService {
    todos!: Todo[];
    todosChanged = new Subject<Todo[]>();
    isLoading = new Subject<boolean>();
    errorMes = new Subject<any>();

    editTodo = new Subject<Todo>();

    constructor(private http: HttpClient) { }

    errorHandling(err: string) {
        let errorMsg = ''
        switch (err) {
            case 'Unauthorized':
                errorMsg = 'You did not authorized'
                break;
            default:
                break;
        }
        this.errorMes.next(errorMsg)
        this.isLoading.next(false);
    }

    addTask(newTodo: { title: string, description: string }) {
        this.isLoading.next(true)
        return this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${+this.todos[this.todos.length - 1].id + 1}.json`,
            { id: (+this.todos[this.todos.length - 1].id + 1).toString(), ...newTodo, completed: false },
        ).pipe(tap({
            next: () => { this.isLoading.next(false) },
            error: error => {
                this.errorHandling(error.statusText)
            }
        }))
    }

    editTask(newTodo: Todo) {
        this.isLoading.next(true)
        return this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${newTodo.id}.json`,
            newTodo,
        ).pipe(tap({
            next: () => { this.isLoading.next(false) },
            error: error => {
                this.errorHandling(error.statusText)
            }
        }))
    }

    changeStatus(todo: Todo, isCompleted: boolean) {
        this.isLoading.next(true);
        return this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`,
            { id: todo.id, title: todo.title, description: todo.description, completed: isCompleted }
        ).pipe(tap({
            next: () => { this.isLoading.next(false) },
            error: error => {
                this.errorHandling(error.statusText)
            }
        }))
    }

    getTasks() {
        this.isLoading.next(true)
        return this.http.get<Todo[]>(
            'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
        ).pipe(map(todos => {
            if (!todos) {
                return [];
            } else {
                return todos.filter(todo => todo !== null);
            }
        }), tap({
            next: res => {
                this.todos = res;
                this.todosChanged.next(res);
                this.isLoading.next(false)
            },
            error: error => {
                this.errorHandling(error.statusText)
            }
        }))
    }

    deleteTask(id: string) {
        this.isLoading.next(true);
        return this.http.delete(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
        ).pipe(tap({
            next: () => { this.isLoading.next(false) },
            error: error => {
                this.errorHandling(error.statusText)
            }
        }))
    }

}