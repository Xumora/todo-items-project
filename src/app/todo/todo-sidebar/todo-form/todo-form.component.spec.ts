import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { of } from "rxjs";
import { mockTodos } from "src/app/shared/mockTodos";
import { TodoService } from "../../todo.service";
import { TodoFormComponent } from "./todo-form.component"

xdescribe('TodoFormComponent', () => {
    let fixture: ComponentFixture<TodoFormComponent>;
    let component: TodoFormComponent;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        const todoServiceSpy = jasmine.createSpyObj('TodoService', ['editTodo', 'addTask', 'editTask'])
        todoServiceSpy.editTodo.and.returnValue(of());

        TestBed.configureTestingModule({
            declarations: [TodoFormComponent],
            imports: [FormsModule, MatFormFieldModule],
            providers: [{ provide: TodoService, useValue: todoServiceSpy }]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoFormComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        })
    }))

    it('should create the TodoForm component', () => {
        fixture.detectChanges();
        expect(component).withContext('TodoForm component not found').toBeTruthy();
    })

})