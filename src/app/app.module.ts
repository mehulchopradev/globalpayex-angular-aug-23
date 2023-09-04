import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameGeneratorComponent } from './name-generator/name-generator.component';
import { FormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CapitalizePipe } from './capitalize.pipe';
import { TodosComponent } from './todos/todos.component';
import { SeriesGenComponent } from './series-gen/series-gen.component';

@NgModule({
  declarations: [
    AppComponent,
    NameGeneratorComponent,
    TodoFormComponent,
    TodoListComponent,
    CapitalizePipe,
    TodosComponent,
    SeriesGenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
