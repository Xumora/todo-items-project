import { NgModule } from "@angular/core";
import { TodoMainComponent } from "./todo-main/todo-main.component";
import { TodoListComponent } from "./todo-main/todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-main/todo-list/todo-item/todo-item.component";
import { TodoFormComponent } from "./todo-form/todo-form.component";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { MatButtonModule } from "@angular/material/button";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { TodoDataService } from "../services/todo-data.service";
import { TodoEntityService } from "../services/todo-entity.service";

const entityMetaData: EntityMetadataMap = {
    Todo: {}
}

@NgModule({
    declarations: [
        TodoMainComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoFormComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        TodoMainComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoFormComponent,
        SpinnerComponent
    ],
    providers: [
        TodoDataService,
        TodoEntityService,
    ]
})
export class TodoModule {
    constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, todoDataService: TodoDataService) {
        eds.registerMetadataMap(entityMetaData)
        entityDataService.registerService('Todo', todoDataService)
    }
}