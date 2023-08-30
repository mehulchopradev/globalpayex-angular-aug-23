import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import Todo from '../types/todo';
import { CapitalizePipe } from '../capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

const selectors = {
  title: '.t-title',
  createdDate: '.t-createdDate',
  todosArea: '.t-todos-area',
  noTodosArea: '.t-notodos-area',
  checkboxes: '.t-checkboxes',
  count: '.t-count',
  finishBtn: '.t-finishbtn',
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
      declarations: [TodoListComponent, CapitalizePipe],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    component.todos = JSON.parse(JSON.stringify(todos));

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

    expect(titles[0].textContent?.trim()).toBe('Todo 1');
    expect(createdDates[0].textContent?.trim()).toBe('(20-08-2023)');

    expect(titles[1].textContent?.trim()).toBe('Todo 2');
    expect(createdDates[1].textContent?.trim()).toBe('(23-08-2023)');
  });

  it('shows no tasks scheduled if 0 todos', () => {
    component.todos = [];
    fixture.detectChanges();

    expect(todoListComponent.querySelector(selectors.todosArea)).toBeNull();
    expect(todoListComponent.querySelector(selectors.noTodosArea)).not.toBeNull();
  });

  it('increments/decrements the marked for completion todos count and enables/disabled button accordingly', fakeAsync(() => {
    const checkboxes: NodeListOf<HTMLElement> = todoListComponent.querySelectorAll(selectors.checkboxes);
    expect(checkboxes.length).toBe(2);
    expect(todoListComponent.querySelector(selectors.count)?.textContent?.trim()).toBe('(0)');
    expect((todoListComponent.querySelector(selectors.finishBtn) as HTMLButtonElement).disabled).toBeTrue();

    checkboxes[1].click();
    fixture.detectChanges();
    tick();
    expect(todoListComponent.querySelector(selectors.count)?.textContent?.trim()).toBe('(1)');
    expect((todoListComponent.querySelector(selectors.finishBtn) as HTMLButtonElement).disabled).toBeFalse();

    checkboxes[0].click();
    fixture.detectChanges();
    tick();
    expect(todoListComponent.querySelector(selectors.count)?.textContent?.trim()).toBe('(2)');
    expect((todoListComponent.querySelector(selectors.finishBtn) as HTMLButtonElement).disabled).toBeFalse();

    checkboxes[0].click();
    fixture.detectChanges();
    tick();
    expect(todoListComponent.querySelector(selectors.count)?.textContent?.trim()).toBe('(1)');
    expect((todoListComponent.querySelector(selectors.finishBtn) as HTMLButtonElement).disabled).toBeFalse();

    checkboxes[1].click();
    fixture.detectChanges();
    tick();
    expect(todoListComponent.querySelector(selectors.count)?.textContent?.trim()).toBe('(0)');
    expect((todoListComponent.querySelector(selectors.finishBtn) as HTMLButtonElement).disabled).toBeTrue();
  }));

  it('shows the ui in appropriate state when finishing the marked for completion todos', fakeAsync(() => {
    const checkboxes: NodeListOf<HTMLElement> = todoListComponent.querySelectorAll(selectors.checkboxes);
    const finishBtn: HTMLButtonElement = todoListComponent.querySelector(selectors.finishBtn)!;

    checkboxes[1].click();
    fixture.detectChanges();
    tick();

    finishBtn.click();
    fixture.detectChanges();

    titles = todoListComponent.querySelectorAll(selectors.title);
    createdDates = todoListComponent.querySelectorAll(selectors.createdDate);
    expect(titles.length).toBe(1);
    expect(createdDates.length).toBe(1);

    checkboxes[0].click();
    fixture.detectChanges();
    tick();

    finishBtn.click();
    fixture.detectChanges();

    titles = todoListComponent.querySelectorAll(selectors.title);
    createdDates = todoListComponent.querySelectorAll(selectors.createdDate);
    expect(titles.length).toBe(0);
    expect(createdDates.length).toBe(0);
  }));

  it('appends the newly added todo to the todos list', () => {
    component.newTodo = {
      id: 3,
      title: 'todo 3',
      isDone: false,
      createdDate: new Date('2023-08-29')
    };
    // we need to manually call ngOnChanges only in tests
    component.ngOnChanges({
      newTodo: new SimpleChange(null, component.newTodo, true),
    });
    fixture.detectChanges();

    titles = todoListComponent.querySelectorAll(selectors.title);
    createdDates = todoListComponent.querySelectorAll(selectors.createdDate);
    expect(titles.length).toBe(3);
    expect(createdDates.length).toBe(3);
  });
});
