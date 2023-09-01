import { Component } from '@angular/core';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-gen',
  templateUrl: './series-gen.component.html',
  styleUrls: ['./series-gen.component.css']
})
export class SeriesGenComponent {
  n: number | null = null;
  seriesType: string | null = null;
  seriesResult: string | null = null;
  addition: number | null = null;
  additionOfSquares: number | null = null;

  constructor(public seriesService: SeriesService) {}

  onGenerate(): void {
    if (this.n && this.seriesType) {
      let result: number[];
      if (this.seriesType === '1') {
        result = this.seriesService.fibo(this.n);
      } else {
        result = this.seriesService.evens(this.n);
      }
      
      this.seriesResult = result.join(',');
      this.addition = result.reduce((accum, currentValue) => accum + currentValue);
      this.additionOfSquares = result.reduce((accum, currentValue) => accum + (currentValue * currentValue));
    }
  }
}
