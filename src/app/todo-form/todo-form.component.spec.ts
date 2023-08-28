import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { FormsModule } from '@angular/forms';

const selectors = {
  newTodo: '.t-new-todo',
  saveBtn: '.t-save',
}

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let todoFormComponent: HTMLElement;
  let newTodoField: HTMLInputElement;
  let saveBtn: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    todoFormComponent = fixture.nativeElement;
    newTodoField = todoFormComponent.querySelector(selectors.newTodo)!;
    saveBtn = todoFormComponent.querySelector(selectors.saveBtn)!;
  });

  it('should show appropriate GUI on load', () => {
    expect(newTodoField.value).toBe('');
    expect(saveBtn.disabled).toBeTrue();
  });

  it('should enable/disable save btn based on newTodo textfield', fakeAsync(() => {
    newTodoField.value = 'todo 1';
    newTodoField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(saveBtn.disabled).toBeFalse();

    newTodoField.value = '';
    newTodoField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(saveBtn.disabled).toBeTrue();
  }));

  it('should reset the GUI to original state and send output event with newTodo, when saving todo', fakeAsync(() => {
    let actualNewTodo: string = '';
    component.onAddNewTodo.subscribe((newTodo: string) => actualNewTodo = newTodo);

    newTodoField.value = 'todo 1';
    newTodoField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    saveBtn.click();

    fixture.detectChanges();
    tick();

    // expecting for the newTodo to be emitted out
    expect(actualNewTodo).toBe('todo 1');

    expect(newTodoField.value).toBe('');
    expect(saveBtn.disabled).toBeTrue();
  }));
});
