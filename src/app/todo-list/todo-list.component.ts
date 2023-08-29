import { Component, Input } from '@angular/core';
import Todo from '../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input()
  todos: Todo[] = [];

  get markedForCompletionTodosCount() {
    return this.todos.filter(todo => todo.isDone).length;
  }

  onFinishTodos() {
    this.todos = this.todos.filter(todo => !todo.isDone);
  }
}
