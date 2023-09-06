import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDescComponent } from './series-desc.component';
import { of } from 'rxjs';
import { ApiService } from '../api.service';

const selectors = {
  fiboDesc: '.t-fibo',
  evenDesc: '.t-even'
};

const seriesDescData = {
  fiboDesc: 'Abc',
  evenDesc: 'Xyz',
};

describe('SeriesDescComponent', () => {
  let component: SeriesDescComponent;
  let fixture: ComponentFixture<SeriesDescComponent>;
  let seriesDescNativeElement: HTMLElement;
  let fiboDescSpan: HTMLSpanElement;
  let evenDescSpan: HTMLSpanElement;
  let apiServiceSpy;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getSeriesDesc']);
    apiServiceSpy.getSeriesDesc.and.returnValue(of(seriesDescData));

    TestBed.configureTestingModule({
      declarations: [SeriesDescComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(SeriesDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    seriesDescNativeElement = fixture.nativeElement;
    fiboDescSpan = seriesDescNativeElement.querySelector(selectors.fiboDesc)!;
    evenDescSpan = seriesDescNativeElement.querySelector(selectors.evenDesc)!;
  });

  it('should show the description of the various series on load', () => {
    expect(fiboDescSpan.textContent?.trim()).toBe('Abc');
    expect(evenDescSpan.textContent?.trim()).toBe('Xyz');
  });
});
