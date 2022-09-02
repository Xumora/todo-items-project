import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "ng-mocks";
import { routes } from "src/app/app-routing.module";
import { SpinnerComponent } from "src/app/shared/spinner/spinner.component";
import { TodoService } from "../todo.service";
import { TodoItemComponent } from "./todo-list/todo-item/todo-item.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoMainComponent } from "./todo-main.component"

xdescribe('TodoMainComponent', () => {
    let fixture: ComponentFixture<TodoMainComponent>;
    let component: TodoMainComponent;
    let el: DebugElement;
    let todoServise: any;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoMainComponent, MockComponent(TodoListComponent), MockComponent(SpinnerComponent)],
            imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
            providers: [TodoService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoMainComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            todoServise = TestBed.inject(TodoService);
            fixture.detectChanges();
        })
    }))

    it('should create TodoMain component', () => {
        expect(component).withContext('TodoMain component not found').toBeTruthy();
    })

    it('should set isLoading', () => {
        todoServise.isLoading.next(true);
        fixture.detectChanges();
        expect(component.isLoading).toBe(true);
    })

})