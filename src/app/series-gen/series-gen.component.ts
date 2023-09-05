import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';
import { ApiService } from '../api.service';
import { Series } from '../types/series';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-series-gen',
  templateUrl: './series-gen.component.html',
  styleUrls: ['./series-gen.component.css']
})
export class SeriesGenComponent implements OnInit {
  n: string | null = null;
  seriesType: string | null = null;
  seriesResult: string | null = null;
  addition: number | null = null;
  additionOfSquares: number | null = null;
  errorMsg: string | null = null;

  constructor(public seriesService: SeriesService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDefaultSeriesData()
      .pipe(
        catchError((err: HttpErrorResponse, caught: any) => {
          console.log(err.message);
          this.errorMsg = 'Error in fetching default series data';
          return of();
        })
      )
      .subscribe((series: Series) => {
        const { n, fiboSeries } = series;
        this.n = n + '';
        this.seriesType = '1';
        this.seriesResult = fiboSeries;
      });
  }

  onGenerate(): void {
    if (this.n && this.seriesType) {
      const n = parseInt(this.n, 10);
      let result: number[];
      if (this.seriesType === '1') {
        result = this.seriesService.fibo(n);
      } else {
        result = this.seriesService.evens(n);
      }
      
      this.seriesResult = result.join(',');
      this.addition = result.reduce((accum, currentValue) => accum + currentValue);
      this.additionOfSquares = result.reduce((accum, currentValue) => accum + (currentValue * currentValue));
    }
  }
}
