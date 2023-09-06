import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SeriesGenComponent } from './series-gen.component';
import { FormsModule } from '@angular/forms';
import { SeriesService } from '../series.service';
import { Series } from '../types/series';
import { of, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { Component } from '@angular/core';

const selectors = {
  nTextField: '.t-n-textfield',
  seriesTypeDropdown: '.t-seriestype-dropdown',
  generateBtn: '.t-generate-btn',
  seriesResultSpan: '.t-seriesresult-span',
  additionSpan: '.t-addition-span',
  additionSquaresSpan: '.t-additionsquares-span',
  error: '.t-error',
};

@Component({ selector: 'app-series-desc', template: ''})
class SeriesDescComponentMock {}

describe('SeriesGenComponent', () => {
  let component: SeriesGenComponent;
  let fixture: ComponentFixture<SeriesGenComponent>;
  let seriesGenNativeElement: HTMLElement;
  let nInputElement: HTMLInputElement;
  let seriesTypeSelectElement: HTMLSelectElement;
  let generateBtnElement: HTMLButtonElement;
  let seriesResultSpanElement: HTMLSpanElement;
  let additionSpanElement: HTMLSpanElement;
  let additionSquaresSpanElement: HTMLSpanElement;
  let seriesServiceStub: Partial<SeriesService>;
  let seriesService: SeriesService;
  let apiServiceStub;
  let getDefaultSeriesDataStub;

  beforeEach(async () => {
    seriesServiceStub = {
      fibo(n) {
        if (n === 7) {
          return [0,1,1,2,3,5,8];
        }
        if (n === 2) {
          return [0,1];
        }
        return [];
      },
      evens(n) {
        return [0,2,4,6];
      }
    };
    const seriesData: Series = {
      n: 7,
      fiboSeries: '0,1,1,2,3,5,8',
      evenSeries: '0,2,4,6'
    };
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getDefaultSeriesData']);
    getDefaultSeriesDataStub = apiServiceStub.getDefaultSeriesData.and.returnValue(of(seriesData));

    TestBed.configureTestingModule({
      declarations: [SeriesGenComponent, SeriesDescComponentMock],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: SeriesService, useValue: seriesServiceStub },
        { provide: ApiService, useValue: apiServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SeriesGenComponent);
    component = fixture.componentInstance;

    seriesGenNativeElement = fixture.nativeElement;
    nInputElement = seriesGenNativeElement.querySelector(selectors.nTextField)!;
    seriesTypeSelectElement = seriesGenNativeElement.querySelector(selectors.seriesTypeDropdown)!;
    generateBtnElement = seriesGenNativeElement.querySelector(selectors.generateBtn)!;
    seriesResultSpanElement = seriesGenNativeElement.querySelector(selectors.seriesResultSpan)!;
    additionSpanElement = seriesGenNativeElement.querySelector(selectors.additionSpan)!;
    additionSquaresSpanElement = seriesGenNativeElement.querySelector(selectors.additionSquaresSpan)!;
    seriesService = TestBed.inject(SeriesService);
  });

  it('should generate the series along with the addition and addition of squares of the series', fakeAsync(() => {
    fixture.detectChanges();
    nInputElement.value = '7';
    nInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    seriesTypeSelectElement.value = '1';
    seriesTypeSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    generateBtnElement.click();
    fixture.detectChanges();
    tick();

    expect(seriesResultSpanElement.textContent?.trim()).toBe('0,1,1,2,3,5,8');
    expect(additionSpanElement.textContent?.trim()).toBe('20');
    expect(additionSquaresSpanElement.textContent?.trim()).toBe('104');
  }));

  it('should generate the series along wiht the addition and addition of squares for boundary value of n = 2', fakeAsync(() => {
    // seriesService.fibo = (n) => [0,1];
    fixture.detectChanges();

    nInputElement.value = '2';
    nInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    seriesTypeSelectElement.value = '1';
    seriesTypeSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    generateBtnElement.click();
    fixture.detectChanges();
    tick();

    expect(seriesResultSpanElement.textContent?.trim()).toBe('0,1');
    expect(additionSpanElement.textContent?.trim()).toBe('1');
    expect(additionSquaresSpanElement.textContent?.trim()).toBe('1');
  }));

  it('should display default series data on load', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(nInputElement.value).toBe('7');
    expect(seriesTypeSelectElement.value).toBe('1');
    expect(seriesResultSpanElement.textContent?.trim()).toBe('0,1,1,2,3,5,8');
  }));

  it('displays error msg when unable to fetch default series data on load', fakeAsync(() => {
    let errorElement: HTMLElement | null = seriesGenNativeElement.querySelector(selectors.error);
    expect(errorElement).toBeNull();

    // stubbing for an error in getDefaultSeriesData()
    getDefaultSeriesDataStub!.and.returnValue(throwError(() => new Error('Error in fetching data')));
    fixture.detectChanges();

    errorElement = seriesGenNativeElement.querySelector(selectors.error);
    expect(errorElement).not.toBeNull();
    expect(errorElement?.textContent?.trim()).toBe('Error in fetching default series data');
  }));
});
