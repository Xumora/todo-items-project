import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from 'ng-mocks'
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component"
import { HeaderComponent } from "./header/header.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ErrorAlertComponent } from "./shared/error-alert/error-alert.component";
import { HandleErrorService } from "./services/handle-error.service";
import { TodoModule } from "./todo/todo.module";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { EntityDataModule } from "@ngrx/data";
import { entityConfig } from "./entity-metadata";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let location: Location;
    let router: Router;
    let handleErrorService: HandleErrorService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MockComponent(ErrorAlertComponent),
                MockComponent(HeaderComponent)
            ],
            imports: [
                RouterTestingModule.withRoutes(routes),
                TodoModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                EntityDataModule.forRoot(entityConfig),
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [HandleErrorService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            location = TestBed.inject(Location);
            router = TestBed.inject(Router);
            handleErrorService = TestBed.inject(HandleErrorService);
            fixture.detectChanges();
        })
    }))

    it('should create the app component', () => {
        expect(component).withContext('App component not found').toBeTruthy();
    })

    it('should change the error message', () => {
        handleErrorService.errorMessage.next('test');
        fixture.detectChanges();
        expect(component.errorMessage).withContext('error message did not changed').toBe('test')
    })

    it('should set error message as a null', () => {
        spyOn(handleErrorService.errorMessage, 'next');
        component.closeModal();
        expect(handleErrorService.errorMessage.next)
            .withContext('closeModal function did not work').toHaveBeenCalledWith(null)
    })
})