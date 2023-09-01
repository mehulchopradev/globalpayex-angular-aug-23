import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor() { }

  fibo(n: number): number[] {
    if (n < 2) {
      throw new Error('for fibo(), n must be 2 or more than that');
    }

    const result: number[] = [];
    let a = 0;
    let b = 1;
    result.push(a, b);

    let i = 2;
    while (i < n) {
      const c = a + b;
      result.push(c);

      a = b;
      b = c;
      i++;
    }
    return result;
  }

  evens(n: number): number[] {
    const result: number[] = [];
    for (let i = 0; i <=n; i = i + 2) {
      result.push(i);
    }
    return result;
  }
}
