import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EntityDataModule } from "@ngrx/data";
import { StoreModule } from "@ngrx/store";
import { entityConfig } from "src/app/entity-metadata";
import { reducers, metaReducers } from "src/app/reducers";
import { TodoEntityService } from "src/app/services/todo-entity.service";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoService } from "../../services/todo.service";
import { TodoModule } from "../todo.module";
import { TodoFormComponent } from "./todo-form.component"

describe('TodoFormComponent', () => {
    let fixture: ComponentFixture<TodoFormComponent>;
    let component: TodoFormComponent;
    let el: DebugElement;
    let todoService: TodoService;
    let todoDataService: TodoEntityService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TodoModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                EntityDataModule.forRoot(entityConfig)
            ],
            providers: [TodoService, TodoEntityService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoFormComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoService = TestBed.inject(TodoService);
            todoDataService = TestBed.inject(TodoEntityService);
            fixture.detectChanges();
        })
    }))

    it('should create the TodoForm component', () => {
        expect(component).withContext('TodoForm component not found').toBeTruthy();
    })

    it('should set edited todo', () => {
        todoService.editTodo.next(mockTodos[0]);
        fixture.detectChanges();
        expect(component.editedTodo).withContext('edited todo not changed').toBe(mockTodos[0]);
        expect(component.editMode).withContext('edit mode not changed').toBe(true);
        expect(component.newTodo.title).withContext('newTodos title not changed').toBe(mockTodos[0].title);
        expect(component.newTodo.description).withContext('newTodos description not changed').toBe(mockTodos[0].description);
    })

    it('should add new task - onSubmit function', () => {
        spyOn(todoDataService, 'add');
        spyOn(component, 'onClear');
        component.editMode = false;
        fixture.detectChanges();
        component.onSubmit();
        expect(todoDataService.add).withContext('service addTask function did not called').toHaveBeenCalled();
        expect(component.onClear).withContext('onClear function did not called').toHaveBeenCalled();
    })

    it('should edit task - onSubmit function', () => {
        spyOn(todoDataService, 'update');
        spyOn(component, 'onClear');
        component.editMode = true;
        todoService.editTodo.next(mockTodos[0]);
        fixture.detectChanges();
        component.onSubmit();
        expect(todoDataService.update).withContext('service editTask function did not called').toHaveBeenCalled();
        expect(component.onClear).withContext('onClear function did not called').toHaveBeenCalled();
    })

    it('should clear form - onClear function', () => {
        spyOn(component.todoForm, 'reset');
        component.onClear();
        expect(component.editMode).withContext('editMode did not change').toBe(false);
        expect(component.todoForm.reset).withContext('todoForm reset function did not called').toHaveBeenCalled();
    })

    it('should change newTodos title - titleInput', () => {
        const titleInput: HTMLInputElement = el.nativeElement.querySelector('input[name=title]');
        titleInput.value = 'test';
        titleInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.newTodo.title).withContext('newTodos title not changed').toBe('test')
    })

    it('should change newTodos description - description textarea', () => {
        const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('textarea[name=description]');
        descriptionInput.value = 'test';
        descriptionInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.newTodo.description).withContext('newTodos description not changed').toBe('test')
    })
})