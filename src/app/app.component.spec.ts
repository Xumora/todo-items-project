import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from 'ng-mocks'
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component"
import { HeaderComponent } from "./header/header.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let location: Location;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, MockComponent(HeaderComponent)],
            imports: [RouterTestingModule.withRoutes(routes)]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            location = TestBed.inject(Location);
            router = TestBed.inject(Router)
        })
    }))

    it('should create the app component', () => {
        expect(component).withContext('App component not found').toBeTruthy();
    })

    it('should redirect to /todos', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).withContext('Router did not navigate').toBe('/todos');
    }))

})