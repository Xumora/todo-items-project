import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { of } from "rxjs";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoService } from "src/app/todo/todo.service";
import { TodoItemComponent } from "./todo-item.component"

describe('TodoItem', () => {
    let fixture: ComponentFixture<TodoItemComponent>;
    let component: TodoItemComponent;
    let el: DebugElement;
    let todoService: any;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [TodoItemComponent],
            imports: [MatCheckboxModule, MatIconModule, HttpClientTestingModule],
            providers: [TodoService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoItemComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoService = TestBed.inject(TodoService);
            component.todo = mockTodos[0];
            fixture.detectChanges();
        })
    }))

    it('should create Todo Item component', () => {
        expect(component).withContext('Todo Item not created').toBeTruthy();
    })

    it('should render true information', () => {
        component.todo = mockTodos[0];
        fixture.detectChanges();
        const title = el.nativeElement.querySelector('.title');
        const description = el.nativeElement.querySelector('.description');
        expect(title.textContent).withContext('title is wrong').toEqual(component.todo.title);
        expect(description.textContent).withContext('description is wrong').toEqual(component.todo.description);
    })

    it('should edit', () => {
        spyOn(todoService.editTodo, 'next');
        const editBtn = el.nativeElement.querySelector('.todo-item-toolbar').children[0];
        editBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges()
        expect(todoService.editTodo.next).withContext('EditTodo.next did not called').toHaveBeenCalled();
    })

    it('should delete', () => {
        spyOn(todoService, 'deleteTask').and.returnValue(of());
        const editBtn = el.nativeElement.querySelector('.todo-item-toolbar').children[1];
        editBtn.dispatchEvent(new Event('click'));
        expect(todoService.deleteTask).withContext('DeleteTask function did not called').toHaveBeenCalled();
    })

    it('should change status', () => {
        spyOn(todoService, 'changeStatus').and.returnValue(of());
        const checkbox = el.nativeElement.querySelector('mat-checkbox');
        checkbox.dispatchEvent(new Event('change'));
        expect(todoService.changeStatus).withContext('changeStatus function did not called').toHaveBeenCalled();
    })

})