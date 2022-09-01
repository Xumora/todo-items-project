import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { MockComponent } from "ng-mocks";
import { TodoFormComponent } from "./todo-form/todo-form.component";
import { TodoSidebarComponent } from "./todo-sidebar.component"

describe('TodoSidebarComponent', () => {
    let fixture: ComponentFixture<TodoSidebarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TodoSidebarComponent, MockComponent(TodoFormComponent)]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoSidebarComponent)
        })
    }))

    it('should create the TodoSidebar component', () => {
        expect(fixture.componentInstance).withContext('TodoSidebar component not found').toBeTruthy();
    })
})