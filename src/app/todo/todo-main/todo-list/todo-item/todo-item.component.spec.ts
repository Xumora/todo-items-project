import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { EntityDataModule } from "@ngrx/data";
import { StoreModule } from "@ngrx/store";
import { entityConfig } from "src/app/entity-metadata";
import { reducers, metaReducers } from "src/app/reducers";
import { TodoEntityService } from "src/app/services/todo-entity.service";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoModule } from "src/app/todo/todo.module";
import { TodoService } from "../../../../services/todo.service";
import { TodoItemComponent } from "./todo-item.component"

describe('TodoItem', () => {
    let fixture: ComponentFixture<TodoItemComponent>;
    let component: TodoItemComponent;
    let el: DebugElement;
    let todoService: TodoService;
    let todoDataService: TodoEntityService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TodoModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                EntityDataModule.forRoot(entityConfig)
            ],
            providers: [TodoService, TodoEntityService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoItemComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoService = TestBed.inject(TodoService);
            todoDataService = TestBed.inject(TodoEntityService);
            component.todo = mockTodos[0];
            fixture.detectChanges();
        })
    }))

    it('should create Todo Item component', () => {
        expect(component).withContext('Todo Item not created').toBeTruthy();
    })

    it('should render title and description of todo', () => {
        const title: HTMLElement = el.nativeElement.querySelector('.title');
        const description: HTMLElement = el.nativeElement.querySelector('.description');
        expect(title.textContent).withContext('title is wrong').toEqual(component.todo.title);
        expect(description.textContent).withContext('description is wrong').toEqual(component.todo.description);
    })

    it('should set editTodo of todoService - onEdit function', () => {
        spyOn(todoService.editTodo, 'next');
        const editBtn: HTMLElement = el.nativeElement.querySelector('.todo-item-toolbar').children[0];
        editBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges()
        expect(todoService.editTodo.next).withContext('EditTodo.next did not called').toHaveBeenCalled();
    })

    it('should delete todo - onDeleteTodo function', () => {
        spyOn(todoDataService, 'delete');
        const deleteBtn: HTMLElement = el.nativeElement.querySelector('.todo-item-toolbar').children[1];
        deleteBtn.dispatchEvent(new Event('click'));
        expect(todoDataService.delete).withContext('onDeleteTodo function did not work').toHaveBeenCalled();
    })

    it('should update the status of Todo - onCheck function', () => {
        spyOn(todoDataService, 'update');
        const checkbox: HTMLInputElement = el.nativeElement.querySelector('mat-checkbox');
        checkbox.dispatchEvent(new Event('change'));
        expect(todoDataService.update).withContext('onCheck function did not work').toHaveBeenCalled();
    })
})