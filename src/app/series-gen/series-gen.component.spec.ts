import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesGenComponent } from './series-gen.component';

describe('SeriesGenComponent', () => {
  let component: SeriesGenComponent;
  let fixture: ComponentFixture<SeriesGenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesGenComponent]
    });
    fixture = TestBed.createComponent(SeriesGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
