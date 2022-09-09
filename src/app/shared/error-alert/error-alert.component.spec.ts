import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ErrorAlertComponent } from "./error-alert.component"

describe("ErrorAlertComponent", () => {
    let component: ErrorAlertComponent;
    let fixture: ComponentFixture<ErrorAlertComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorAlertComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ErrorAlertComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        })
    }))

    it('should create the ErrorAlert component', () => {
        expect(component).withContext('ErrorAlert component not found').toBeTruthy();
    })

    it('should display error message', () => {
        component.message = 'test'
        fixture.detectChanges();
        const msg: HTMLElement = el.nativeElement.querySelector('.errorAlert-content-message');
        expect(msg.textContent).withContext('Message not shown').toEqual('test')
    })

    it('should add errorAlert close event emitter - button', () => {
        const btn: HTMLElement = el.nativeElement.querySelector('.errorAlert-content-close');
        spyOn(component.modalClosed, 'emit');
        btn.dispatchEvent(new Event('click'));
        expect(component.modalClosed.emit).withContext('errorAlert close event emitter not called').toHaveBeenCalled();
    })

    it('should add errorAlert close event emitter - errorAlert', () => {
        const modal: HTMLElement = el.nativeElement.querySelector('.errorAlert');
        spyOn(component.modalClosed, 'emit');
        modal.dispatchEvent(new Event('click'));
        expect(component.modalClosed.emit).withContext('errorAlert close event emitter not called').toHaveBeenCalled();
    })
})