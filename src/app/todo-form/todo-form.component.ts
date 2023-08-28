import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  newTodo = '';

  @Output()
  onAddNewTodo = new EventEmitter<string>();

  onSave() {
    // send the newTodo as an Event outside (output) to the parent component
    this.onAddNewTodo.emit(this.newTodo);

    // reset the GUI state
    this.newTodo = '';
  }
}
