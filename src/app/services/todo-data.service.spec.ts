import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoDataService } from './todo-data.service';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';
import { entityConfig } from '../entity-metadata';
import { mockTodos } from '../shared/mockTodos';

describe('TodoDataService', () => {
  let todoDataService: TodoDataService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EntityDataModule.forRoot(entityConfig),
      ],
      providers: [TodoDataService, EntityDataService],
    });
    todoDataService = TestBed.inject(TodoDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get all todos', () => {
    todoDataService.getAll().subscribe(res => {
      expect(res).withContext('No response returned').toBeTruthy();
      expect(res).withContext('Wrong response').toEqual(mockTodos);
    });
    const req = httpTestingController.expectOne(
      'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodos);
  });

  it('should add todo', () => {
    todoDataService.add(mockTodos[0]).subscribe(res => {
      expect(res).withContext('No response returned').toBeTruthy();
      expect(res).withContext('Wrong response').toEqual(mockTodos[0]);
    });
    const req = httpTestingController.expectOne(
      'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(mockTodos[0]);
  });

  it('should update todo', () => {
    todoDataService
      .update({ id: '1', changes: mockTodos[0] })
      .subscribe(res => {
        expect(res).withContext('No response returned').toBeTruthy();
        expect(res).withContext('Wrong response').toEqual(mockTodos[0]);
      });
    const req = httpTestingController.expectOne(
      'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(mockTodos[0]);
  });

  it('should delete todo', () => {
    todoDataService.delete('1').subscribe(res => {
      expect(res).withContext('No response returned').toBeTruthy();
      expect(res).withContext('Wrong response').toEqual('dummy data');
    });
    const req = httpTestingController.expectOne(
      'https://todo-app-4b811-default-rtdb.europe-west1.firebasedatabase.app/todos/1.json'
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush('dummy data');
  });
});
