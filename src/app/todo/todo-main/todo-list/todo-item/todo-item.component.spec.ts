import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { entityConfig } from 'src/app/entity-metadata';
import { reducers, metaReducers } from 'src/app/reducers';
import { TodoEntityService } from 'src/app/services/todo-entity.service';
import { mockTodos } from 'src/app/shared/mockTodos';
import { getTranslocoModule } from 'src/app/shared/transloco-testing.module';
import { TodoModule } from 'src/app/todo/todo.module';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItem', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let el: DebugElement;
  let todoEntityService: TodoEntityService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoModule,
        getTranslocoModule(),
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EntityDataModule.forRoot(entityConfig),
      ],
      providers: [TodoEntityService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        todoEntityService = TestBed.inject(TodoEntityService);
        component.todo = mockTodos[0];
        fixture.detectChanges();
      });
  }));

  it('should create Todo Item component', () => {
    expect(component).withContext('Todo Item not created').toBeTruthy();
  });

  it('should render title and description of todo', () => {
    const title: HTMLElement = el.nativeElement.querySelector('.title');
    const description: HTMLElement =
      el.nativeElement.querySelector('.description');
    expect(title.textContent)
      .withContext('title is wrong')
      .toEqual(component.todo.title);
    expect(description.textContent)
      .withContext('description is wrong')
      .toEqual(component.todo.description);
  });

  it('should delete todo - onDeleteTodo function', () => {
    spyOn(todoEntityService, 'delete');
    const deleteBtn: HTMLElement =
      el.nativeElement.querySelector('.todo-item-toolbar').children[1];
    deleteBtn.dispatchEvent(new Event('click'));
    expect(todoEntityService.delete)
      .withContext('onDeleteTodo function did not work')
      .toHaveBeenCalled();
  });

  it('should update the status of Todo - onCheck function', () => {
    spyOn(todoEntityService, 'update');
    const checkbox: HTMLInputElement =
      el.nativeElement.querySelector('mat-checkbox');
    checkbox.dispatchEvent(new Event('change'));
    expect(todoEntityService.update)
      .withContext('onCheck function did not work')
      .toHaveBeenCalled();
  });
});
