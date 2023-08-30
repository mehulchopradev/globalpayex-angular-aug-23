import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../capitalize.pipe';

const selectors = {
  newTodo: '.t-new-todo',
  saveBtn: '.t-save',
  title: '.t-title',
  createdDate: '.t-createdDate',
  todosArea: '.t-todos-area',
  noTodosArea: '.t-notodos-area',
  checkboxes: '.t-checkboxes',
  count: '.t-count',
  finishBtn: '.t-finishbtn',
}

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todosNativeElement: HTMLElement;
  let newTodoField: HTMLInputElement;
  let saveBtn: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, TodoFormComponent, TodoListComponent, CapitalizePipe],
      imports: [
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    todosNativeElement = fixture.nativeElement;
    newTodoField = todosNativeElement.querySelector(selectors.newTodo)!;
    saveBtn = todosNativeElement.querySelector(selectors.saveBtn)!;
  });

  it('should add new todo from the form to the todo list below', fakeAsync(() => {
    newTodoField.value = 'todo 1';
    newTodoField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    saveBtn.click();

    fixture.detectChanges();
    tick();

    let titles: NodeListOf<HTMLElement> = todosNativeElement.querySelectorAll(selectors.title);
    let createdDates: NodeListOf<HTMLElement> = todosNativeElement.querySelectorAll(selectors.createdDate);
    expect(titles.length).toBe(1);
    expect(createdDates.length).toBe(1);
    expect(titles[0].textContent?.trim()).toBe('Todo 1');

    newTodoField.value = 'todo 2';
    newTodoField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    saveBtn.click();

    fixture.detectChanges();
    tick();
    titles = todosNativeElement.querySelectorAll(selectors.title);
    createdDates = todosNativeElement.querySelectorAll(selectors.createdDate);
    expect(titles.length).toBe(2);
    expect(createdDates.length).toBe(2);
    expect(titles[1].textContent?.trim()).toBe('Todo 2');
  }));
});
