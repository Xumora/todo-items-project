import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { MockComponent } from "ng-mocks";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoListComponent } from "./todo-list.component"

describe('TodoListComponent', () => {
    let fixture: ComponentFixture<TodoListComponent>;
    let component: TodoListComponent;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListComponent, MockComponent(TodoItemComponent)]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        })
    }))

    it('should create TodoList component', () => {
        expect(component).withContext('TodoList component not found').toBeTruthy();
    })

    it('should create list of todos', () => {
        component.todos = mockTodos;
        fixture.detectChanges();
        const list: HTMLElement = el.nativeElement.querySelector('.todo-list')
        expect(list.children.length).withContext('todo items not created').toEqual(3);
    })
})