import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SeriesDesc } from '../types/series-desc';

@Component({
  selector: 'app-series-desc',
  templateUrl: './series-desc.component.html',
  styleUrls: ['./series-desc.component.css']
})
export class SeriesDescComponent implements OnInit {
  fiboDesc: string | null = null;
  evenDesc: string | null = null;

  constructor(private apiService: ApiService){}


  ngOnInit(): void {
    this.apiService.getSeriesDesc()
      .subscribe((seriesDesc: SeriesDesc) => {
        const { fiboDesc, evenDesc } = seriesDesc;
        this.fiboDesc = fiboDesc;
        this.evenDesc = evenDesc;
      });
  }
}
