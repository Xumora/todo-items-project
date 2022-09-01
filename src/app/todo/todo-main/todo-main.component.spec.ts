import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoService } from "../todo.service";
import { TodoMainComponent } from "./todo-main.component"

xdescribe('TodoMainComponent', () => {
    let fixture: ComponentFixture<TodoMainComponent>;
    let component: TodoMainComponent;
    let el: DebugElement;
    let todoServise: any;

    beforeEach(waitForAsync(() => {
        const todoServiceSpy = jasmine.createSpyObj('TodoService', ['todosChanged', 'isLoading', 'errorMes', 'getTasks'])

        TestBed.configureTestingModule({
            declarations: [TodoMainComponent],
            imports: [RouterTestingModule],
            providers: [{ provide: TodoService, useValue: todoServiceSpy }]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoMainComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoServise = TestBed.inject(TodoService);
            todoServise.todosChanged.and.returnValue(of(mockTodos));
            fixture.detectChanges();
        })
    }))

    it('should create TodoMain component', () => {
        expect(component).withContext('TodoMain component not found').toBeTruthy();
    })
})