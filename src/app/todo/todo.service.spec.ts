import { TodoService } from "./todo.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from "@angular/core/testing";
import { mockTodos } from "../shared/mockTodos";

describe('TodoService', () => {
    let todoService: TodoService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TodoService]
        })
        todoService = TestBed.inject(TodoService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('should delete task', () => {
        todoService.deleteTask('1').subscribe(res => {
            expect(res).withContext('No response returned').toBeTruthy();
            expect(res).withContext('Wrong response').toEqual('dummy data');
        });
        const req = httpTestingController.expectOne('https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json');
        expect(req.request.method).toEqual('DELETE');
        req.flush('dummy data');
    })

    it('should get tasks', () => {
        spyOn(todoService.todosChanged, 'next')
        todoService.getTasks().subscribe(res => {
            expect(res).withContext('No response returned').toBeTruthy();
            expect(res).withContext('Wrong response').toEqual(mockTodos);
            expect(todoService.todos).toEqual(mockTodos);
        })
        const req = httpTestingController.expectOne('https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
        expect(req.request.method).toEqual('GET');
        req.flush(mockTodos)
        expect(todoService.todosChanged.next).withContext('todosChanged subject not called').toHaveBeenCalled();
    })

    it('should change status', () => {
        todoService.changeStatus(mockTodos[0], true).subscribe(res => {
            expect(res).withContext('No response returned').toBeTruthy();
            expect(res).withContext('Wrong response').toEqual('dummy data');
        })
        const req = httpTestingController.expectOne('https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json');
        expect(req.request.method).toEqual('PUT');
        req.flush('dummy data')
    })

    it('should edit task', () => {
        todoService.editTask(mockTodos[0]).subscribe(res => {
            expect(res).withContext('No response returned').toBeTruthy();
            expect(res).withContext('Wrong response').toEqual('dummy data');
        })
        const req = httpTestingController.expectOne('https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json');
        expect(req.request.method).toEqual('PUT');
        req.flush('dummy data')
    })

    it('should add task', () => {
        todoService.todos = mockTodos;
        todoService.addTask({ title: 'test', description: 'test' }).subscribe(res => {
            expect(res).withContext('No response returned').toBeTruthy();
            expect(res).withContext('Wrong response').toEqual('dummy data');
        })
        const req = httpTestingController.expectOne('https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/4.json');
        expect(req.request.method).toEqual('PUT');
        req.flush('dummy data')
    })

    it('should error handle', () => {
        spyOn(todoService.isLoading, 'next');
        spyOn(todoService.errorMes, 'next')
        todoService.errorHandling('Unauthorized');
        expect(todoService.isLoading.next).toHaveBeenCalledWith(false);
        expect(todoService.errorMes.next).toHaveBeenCalledWith('You did not authorized');
    })
})