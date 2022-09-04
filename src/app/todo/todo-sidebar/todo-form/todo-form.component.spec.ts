import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoService } from "../../todo.service";
import { TodoFormComponent } from "./todo-form.component"

describe('TodoFormComponent', () => {
    let fixture: ComponentFixture<TodoFormComponent>;
    let component: TodoFormComponent;
    let el: DebugElement;
    let todoService: any;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoFormComponent],
            imports: [FormsModule, MatFormFieldModule, HttpClientTestingModule, MatInputModule, BrowserAnimationsModule],
            providers: [TodoService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoFormComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoService = TestBed.inject(TodoService);
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

    it('should add new task', () => {
        spyOn(todoService, 'addTask').and.returnValue(of())
        spyOn(component, 'onClear');
        component.editMode = false;
        fixture.detectChanges();
        component.onSubmit();
        expect(todoService.addTask).withContext('service addTask function did not called').toHaveBeenCalled();
        expect(component.onClear).withContext('onClear function did not called').toHaveBeenCalled();
    })

    it('should edit task', () => {
        spyOn(todoService, 'editTask').and.returnValue(of())
        spyOn(component, 'onClear');
        component.editMode = true;
        todoService.editTodo.next(mockTodos[0]);
        fixture.detectChanges();
        component.onSubmit();
        expect(todoService.editTask).withContext('service editTask function did not called').toHaveBeenCalled();
        expect(component.onClear).withContext('onClear function did not called').toHaveBeenCalled();
    })

    it('should clear form', () => {
        spyOn(component.todoForm, 'reset');
        component.onClear();
        expect(component.editMode).withContext('editMode did not change').toBe(false);
        expect(component.todoForm.reset).withContext('todoForm reset function did not called').toHaveBeenCalled();
    })

    it('should change newTodos title', () => {
        const titleInput = el.nativeElement.querySelector('input[name=title]');
        titleInput.value = 'test';
        titleInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.newTodo.title).withContext('newTodos title not changed').toBe('test')
    })

    it('should change newTodos description', () => {
        const descriptionInput = el.nativeElement.querySelector('textarea[name=description]');
        descriptionInput.value = 'test';
        descriptionInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.newTodo.description).withContext('newTodos description not changed').toBe('test')
    })

})