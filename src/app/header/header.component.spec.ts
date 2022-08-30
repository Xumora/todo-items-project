import { Location } from "@angular/common";
import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterTestingModule } from '@angular/router/testing'
import { routes } from "../app-routing.module";
import { HeaderComponent } from "./header.component"

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let el: DebugElement;
    let location: Location;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [RouterTestingModule.withRoutes(routes), MatButtonModule, MatToolbarModule]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            location = TestBed.inject(Location);
        })
    }))

    it('should create the header component', () => {
        expect(component).withContext('Header component did not found!').toBeTruthy()
    })

    it('should navigate to /todos url', fakeAsync(() => {
        const link = el.nativeElement.querySelectorAll('a')[0]
        link.click();
        tick();
        expect(location.path()).toBe('/todos')
    }))

    it('should navigate to /completed url', fakeAsync(() => {
        const link = el.nativeElement.querySelectorAll('a')[1]
        link.click();
        tick();
        expect(location.path()).toBe('/completed')
    }))

    it('should navigate to /all url', fakeAsync(() => {
        const link = el.nativeElement.querySelectorAll('a')[2]
        link.click();
        tick();
        expect(location.path()).toBe('/all')
    }))

})