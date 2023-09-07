import { Component, DebugElement } from '@angular/core';
import { CaseDirective } from './case.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <span case="upper">mehul chopra</span>
    <span case>mehul chopra</span>
    <span case="capitalize">mehul chopra</span>
    <span>mehul chopra</span>
  `
})
class TestComponent {}

describe('CaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponentDebugElement: DebugElement;
  let caseDebugElements: DebugElement[];
  let nocaseDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);

    testComponentDebugElement = fixture.debugElement;
    caseDebugElements = testComponentDebugElement.queryAll(By.directive(CaseDirective));
    nocaseDebugElement = testComponentDebugElement.query(By.css('span:not([case])'));

    fixture.detectChanges();
  });

  it('should change case for the elements where case directive is applied', () => {
    expect(caseDebugElements.length).toBe(3);
    expect(caseDebugElements[0].nativeElement.textContent.trim()).toBe('MEHUL CHOPRA');
    expect(caseDebugElements[1].nativeElement.textContent.trim()).toBe('Mehul chopra');
    expect(caseDebugElements[2].nativeElement.textContent.trim()).toBe('Mehul chopra');
  });

  it('should not change case for the elements where case directive is not applied', () => {
    expect(nocaseDebugElement.nativeElement.textContent.trim()).toBe('mehul chopra');
  });
});
