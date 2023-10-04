import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowSalesComponent } from './cow-sales.component';

describe('CowSalesComponent', () => {
  let component: CowSalesComponent;
  let fixture: ComponentFixture<CowSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CowSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
