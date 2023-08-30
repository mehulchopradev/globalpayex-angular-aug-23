import { Component } from '@angular/core';
import Todo from '../types/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

  todos: Todo[] = []; // in the future, these initial set of todos could come from an API service
  newTodo: Todo | null = null;
  id: number = 0; // temporary solution in the absence of the server api

  onAddNewTodo(newTodoStr: string) {
    // api call to save the todo on the server
    // server in the response would send the id of the newly created todo
    const obj: Todo = {
      id: ++this.id,
      title: newTodoStr,
      isDone: false,
      createdDate: new Date(),
    }
    this.newTodo = obj;
  }
}
