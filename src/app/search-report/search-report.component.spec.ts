import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportComponent } from './search-report.component';

describe('SearchReportComponent', () => {
  let component: SearchReportComponent;
  let fixture: ComponentFixture<SearchReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
