import { TestBed } from '@angular/core/testing';

import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesService);
  });

  const fiboScenarios = [
    {
      title: 'fibo() when n = 8',
      input: 8,
      output: [0,1,1,2,3,5,8,13]
    },
    {
      title: 'fibo() when n = 2',
      input: 2,
      output: [0,1]
    },
    {
      title: 'fibo() when n = 3',
      input: 3,
      output: [0,1,1]
    },
    {
      title: 'fibo() throws an error',
      input: 1,
      error: new Error('for fibo(), n must be 2 or more than that')
    }
  ];

  fiboScenarios.forEach(({ title, input, output, error }) => {
    it(title, () => {
      if (output) {
        const actualOutput = service.fibo(input);
        expect(actualOutput).toEqual(output); // to check on arrays use toEqual and not toBe
      } else if (error) {
        expect(() => service.fibo(input)).toThrow(error);
      }
    });
  });

  it('evens() when n = 8', () => {
    expect(service.evens(8)).toEqual([0,2,4,6,8]);
  });
  it('evens() when n = 9', () => {
    expect(service.evens(9)).toEqual([0,2,4,6,8]);
  });
});
