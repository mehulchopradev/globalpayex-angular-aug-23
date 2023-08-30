import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Todo from '../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnChanges {
  @Input()
  todos: Todo[] = [];

  @Input()
  newTodo: Todo | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newTodo'] && changes['newTodo'].currentValue != changes['newTodo'].previousValue) {
      this.todos.push(changes['newTodo'].currentValue);
    }
  }

  get markedForCompletionTodosCount() {
    return this.todos.filter(todo => todo.isDone).length;
  }

  onFinishTodos() {
    this.todos = this.todos.filter(todo => !todo.isDone);
  }
}
