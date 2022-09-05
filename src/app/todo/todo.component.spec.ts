import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { MockComponent } from "ng-mocks";
import { TodoMainComponent } from "./todo-main/todo-main.component";
import { TodoSidebarComponent } from "./todo-sidebar/todo-sidebar.component";
import { TodoComponent } from "./todo.component"

describe('TodoComponent', () => {
    let fixture: ComponentFixture<TodoComponent>;
    let component: TodoComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoComponent, MockComponent(TodoMainComponent), MockComponent(TodoSidebarComponent)]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            component = fixture.componentInstance;
        })
    }))

    it('should create the Todo component', () => {
        expect(component).withContext('TodoSidebar component not found').toBeTruthy();
    })

})