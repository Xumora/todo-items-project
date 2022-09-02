import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent, MockProvider, MockService } from "ng-mocks";
import { of } from "rxjs";
import { routes } from "src/app/app-routing.module";
import { TodoService } from "../todo.service";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoMainComponent } from "./todo-main.component"

describe('TodoMainComponent', () => {
    let fixture: ComponentFixture<TodoMainComponent>;
    let component: TodoMainComponent;
    let el: DebugElement;
    let todoServise: any;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoMainComponent, MockComponent(TodoListComponent)],
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

    // it('should set isLoading', () => {
    //     spyOn(todoServise, 'isLoading').and.returnValue(of(true));
    //     fixture.detectChanges();
    //     expect(component.isLoading).toBe(true);
    // })

})