import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Subject, tap } from "rxjs";
import { Todo } from "./todo.model";

@Injectable({ providedIn: 'root' }) export class TodoService {
    private todos!: Todo[];
    todosChanged = new Subject<Todo[]>();
    isLoading = new Subject<boolean>();
    editMode = new Subject<boolean>()
    editTodo!: Todo;
    errorMes = new Subject<any>()
    constructor(private http: HttpClient, private router: Router) { }

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
        this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${this.todos.length}.json`,
            { id: this.todos.length.toString(), ...newTodo, completed: false },
        ).pipe(tap({
            error: error => {
                this.errorHandling(error.statusText)
            }
        })).subscribe(() => {
            this.getTasks()
        })
    }

    editTask(newTodo: { title: string, description: string }) {
        this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${this.editTodo.id}.json`,
            { id: this.editTodo.id, ...newTodo, completed: this.editTodo.completed },
        ).pipe(tap({
            error: error => {
                this.errorHandling(error.statusText)
            }
        })).subscribe(() => {
            this.getTasks()
        })
    }

    changeStatus(todo: Todo, isCompleted: boolean) {
        this.http.put(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`,
            { id: todo.id, title: todo.title, description: todo.description, completed: isCompleted }
        ).pipe(tap({
            error: error => {
                this.errorHandling(error.statusText)
            }
        })).subscribe(() => {
            this.getTasks()
        })
    }

    getTasks() {
        this.isLoading.next(true);
        this.http.get<Todo[]>(
            'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
        ).pipe(tap({
            error: error => {
                this.errorHandling(error.statusText)
            }
        }), map(todos => {
            if (!todos) {
                return [];
            } else {
                return todos.filter(todo => todo !== null);
            }
        })).subscribe(res => {
            const currentRoute = this.router.url;
            this.todos = res;
            this.isLoading.next(false);
            if (currentRoute === '/todos') {
                this.todosChanged.next(this.todos.filter(todo => !todo?.completed))
            } else if (currentRoute === '/completed') {
                this.todosChanged.next(this.todos.filter(todo => todo?.completed))
            } else if (currentRoute === '/all') {
                this.todosChanged.next(this.todos)
            }
        })
    }

    deleteTask(id: string) {
        this.http.delete(
            `https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
        ).pipe(tap({
            error: error => {
                this.errorHandling(error.statusText)
            }
        })).subscribe(() => {
            this.getTasks()
        })
    }
}