import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "ng-mocks";
import { routes } from "src/app/app-routing.module";
import { ModalComponent } from "src/app/shared/modal/modal.component";
import { SpinnerComponent } from "src/app/shared/spinner/spinner.component";
import { TodoService } from "../todo.service";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoMainComponent } from "./todo-main.component"

describe('TodoMainComponent', () => {
    let fixture: ComponentFixture<TodoMainComponent>;
    let component: TodoMainComponent;
    let el: DebugElement;
    let todoServise: TodoService;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoMainComponent, MockComponent(TodoListComponent), MockComponent(SpinnerComponent), MockComponent(ModalComponent)],
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
        expect(component.isLoading).withContext('isLoading not changed').toBe(true);
    })

    it('should set error message', () => {
        todoServise.errorMes.next('Error');
        fixture.detectChanges();
        expect(component.errorMessage).withContext('errorMessage not changed').toBe('Error');
    })

    it('should set errorMessage as a null', () => {
        spyOn(todoServise.errorMes, 'next');
        component.closeModal();
        expect(todoServise.errorMes.next).withContext('closeModal did not work').toHaveBeenCalledWith(null);
    })
})