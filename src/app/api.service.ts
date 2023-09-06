import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from './types/series';
import { SeriesDesc } from './types/series-desc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  DEFAULT_SERIES_DATA_API_URL: string = 'https://my-json-server.typicode.com/mehulchopradev/calc-service/defaultSeriesData';
  SERIES_DESC_API_URL: string = 'https://my-json-server.typicode.com/mehulchopradev/calc-service/seriesDescription';

  constructor(private httpClient: HttpClient) { }

  getDefaultSeriesData(): Observable<Series> {
    return this.httpClient.get<Series>(this.DEFAULT_SERIES_DATA_API_URL);
  }

  getSeriesDesc(): Observable<SeriesDesc> {
    return this.httpClient.get<SeriesDesc>(this.SERIES_DESC_API_URL);
  }
}
