import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoService } from '@ngneat/transloco';
import { EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { routes } from '../app-routing.module';
import { entityConfig } from '../entity-metadata';
import { reducers, metaReducers } from '../reducers';
import { getTranslocoModule } from '../shared/transloco-testing.module';
import { TodoModule } from '../todo/todo.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
        HttpClientTestingModule,
        TodoModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EntityDataModule.forRoot(entityConfig),
        getTranslocoModule()
      ],
      providers: [TranslocoService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        location = TestBed.inject(Location);
        fixture.detectChanges();
      });
  }));

  it('should create the header component', () => {
    expect(component).withContext('Header component not found!').toBeTruthy();
  });

  it('should navigate to /todos url', fakeAsync(() => {
    const link: HTMLElement = el.nativeElement.querySelectorAll('a')[0];
    link.click();
    tick();
    expect(location.path())
      .withContext('todos link does not navigate to /todos')
      .toBe('/todos');
  }));

  it('should navigate to /completed url', fakeAsync(() => {
    const link: HTMLElement = el.nativeElement.querySelectorAll('a')[1];
    link.click();
    tick();
    expect(location.path())
      .withContext('completed link does not navigate to /completed')
      .toBe('/completed');
  }));

  it('should navigate to /all url', fakeAsync(() => {
    const link: HTMLElement = el.nativeElement.querySelectorAll('a')[2];
    link.click();
    tick();
    expect(location.path())
      .withContext('all tasks link does not navigate to /all')
      .toBe('/all');
  }));
});
