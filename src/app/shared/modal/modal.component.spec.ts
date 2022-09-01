import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ModalComponent } from "./modal.component"

describe("ModalComponent", () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ModalComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        })
    }))

    it('should create the modal component', () => {
        expect(component).withContext('Modal component not found').toBeTruthy();
    })

    it('should display message', () => {
        component.message = 'test'
        fixture.detectChanges();
        const msg = el.query(By.css('.modal-content-message'));
        expect(msg.nativeElement.textContent).withContext('Message not shown').toEqual('test')
    })

    it('should add error class', () => {
        component.isError = true;
        fixture.detectChanges();
        const modalContent = el.query(By.css('.modal-content'));
        expect(modalContent.nativeElement.classList)
            .withContext('Error class not added').toContain('error');
    })

    it('should add modal close event emitter - button', () => {
        const btn = el.nativeElement.querySelector('.modal-content-close');
        spyOn(component.modalClosed, 'emit');
        btn.dispatchEvent(new Event('click'));
        expect(component.modalClosed.emit).withContext('Event emitter not called').toHaveBeenCalled();
    })

    it('should add modal close event emitter - modal', () => {
        const modal = el.nativeElement.querySelector('.modal');
        spyOn(component.modalClosed, 'emit');
        modal.dispatchEvent(new Event('click'));
        expect(component.modalClosed.emit).withContext('Event emitter not called').toHaveBeenCalled();
    })
})