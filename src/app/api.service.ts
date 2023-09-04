import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from './types/series';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  DEFAULT_SERIES_DATA_API_URL: string = 'https://my-json-server.typicode.com/mehulchopradev/calc-service/defaultSeriesData';

  constructor(private httpClient: HttpClient) { }

  getDefaultSeriesData(): Observable<Series> {
    return this.httpClient.get<Series>(this.DEFAULT_SERIES_DATA_API_URL);
  }
}
