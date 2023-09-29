import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowsComponent } from './cows.component';

describe('CowsComponent', () => {
  let component: CowsComponent;
  let fixture: ComponentFixture<CowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
