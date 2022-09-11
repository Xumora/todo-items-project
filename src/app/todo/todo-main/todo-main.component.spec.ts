import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { routes } from 'src/app/app-routing.module';
import { entityConfig } from 'src/app/entity-metadata';
import { reducers, metaReducers } from 'src/app/reducers';
import { TodoEntityService } from 'src/app/services/todo-entity.service';
import { TodoModule } from '../todo.module';
import { TodoMainComponent } from './todo-main.component';

describe('TodoMainComponent', () => {
  let fixture: ComponentFixture<TodoMainComponent>;
  let component: TodoMainComponent;
  let el: DebugElement;
  let todoDataService: TodoEntityService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        TodoModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EntityDataModule.forRoot(entityConfig),
      ],
      providers: [TodoEntityService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TodoMainComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        todoDataService = TestBed.inject(TodoEntityService);
        fixture.detectChanges();
      });
  }));

  it('should create TodoMain component', () => {
    expect(component).withContext('TodoMain component not found').toBeTruthy();
  });
});
