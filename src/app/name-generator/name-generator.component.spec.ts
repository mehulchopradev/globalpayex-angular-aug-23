import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NameGeneratorComponent } from './name-generator.component';
import { FormsModule } from '@angular/forms';

const selectors = {
  firstName: '.t-firstName',
  lastName: '.t-lastName',
  fullName: '.t-fullName',
  fullNameArea: '.t-fullName-area',
};

// test suite
// describe -> group multiple test cases together
describe('NameGeneratorComponent', () => {
  let component: NameGeneratorComponent;
  let fixture: ComponentFixture<NameGeneratorComponent>;
  let firstName: HTMLInputElement;
  let lastName: HTMLInputElement;
  let fullName: HTMLSpanElement;
  let fullNameArea: HTMLElement | null;
  let nameGeneratorComponent: HTMLElement

  // this lifecycle method is called only once at the start of running the test suite
  beforeAll(() => {});

  // this lifecycle method is called before every `it()`
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NameGeneratorComponent],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(NameGeneratorComponent);
    component = fixture.componentInstance;

    nameGeneratorComponent = fixture.nativeElement;
    firstName = nameGeneratorComponent.querySelector(selectors.firstName)!;
    lastName = nameGeneratorComponent.querySelector(selectors.lastName)!;
    fullName = nameGeneratorComponent.querySelector(selectors.fullName)!;
    fullNameArea = nameGeneratorComponent.querySelector(selectors.fullNameArea);

    fixture.detectChanges(); // manually asks Angular to run the change detection cycle
  });

  // this lifecycle method is called after every `it()`
  afterEach(() => {});

  // this lifecycle method is called only once at the end of the test suite
  afterAll(() => {});

  // a test case / a scenario
  it('displays initial on load gui state accordingly', () => {
    // scenario steps and assertions
    
    // assert (check)
    // firstName -- empty
    // lastName -- empty
    // fulllName -- empty
    expect(firstName.value).toBe('');
    expect(lastName.value).toBe('');
    expect(fullNameArea).toBeNull();
  });

  it('live updates the full name based on first and last name', fakeAsync(() => {

    firstName.value = 'mehul';
    firstName.dispatchEvent(new Event('input'));

    lastName.value = 'chopra';
    lastName.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // Angular run the change detection cycle. In regular application run, this happens
    // automatically
    // want to wait for ngModel to sync up changes between the ui and the model
    tick();

    fullNameArea = nameGeneratorComponent.querySelector(selectors.fullNameArea);
    expect(fullNameArea).not.toBeNull();

    fullName = nameGeneratorComponent.querySelector(selectors.fullName)!;
    expect(fullName.textContent?.trim()).toBe('mehul chopra');
  }));
});
