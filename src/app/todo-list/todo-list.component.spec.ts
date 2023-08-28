import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import Todo from '../types/todo';

const selectors = {
  title: '.t-title',
  createdDate: '.t-createdDate',
  todosArea: '.t-todos-area',
  noTodosArea: '.t-notodos-area',
};

const todos: Todo[] = [
  {
    id: 1,
    title: 'todo 1',
    createdDate: new Date('2023-08-20'),
    isDone: false,
  },
  {
    id: 2,
    title: 'TODO 2',
    createdDate: new Date('2023-08-23'),
    isDone: false,
  }
];

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoListComponent: HTMLElement;
  let titles: NodeListOf<HTMLElement>;
  let createdDates: NodeListOf<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    component.todos = todos;

    fixture.detectChanges(); // causes angular to run the initial data binding between todos (@Input) and the GUI

    todoListComponent = fixture.nativeElement;
    titles = todoListComponent.querySelectorAll(selectors.title);
    createdDates = todoListComponent.querySelectorAll(selectors.createdDate);
  });

  it('should display the todos in the table', () => {
    expect(todoListComponent.querySelector(selectors.todosArea)).not.toBeNull();
    expect(todoListComponent.querySelector(selectors.noTodosArea)).toBeNull();

    expect(titles.length).toBe(2);
    expect(createdDates.length).toBe(2);

    expect(titles[0].textContent?.trim()).toBe('todo 1');
    expect(createdDates[0].textContent?.trim()).toBe('(20-08-2023)');

    expect(titles[1].textContent?.trim()).toBe('TODO 2');
    expect(createdDates[1].textContent?.trim()).toBe('(23-08-2023)');
  });

  it('shows no tasks scheduled if 0 todos', () => {
    component.todos = [];
    fixture.detectChanges();

    expect(todoListComponent.querySelector(selectors.todosArea)).toBeNull();
    expect(todoListComponent.querySelector(selectors.noTodosArea)).not.toBeNull();
  });
});
