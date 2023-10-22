import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkRecordsComponent } from './milk-records.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

describe('MilkRecordsComponent', () => {
  let component: MilkRecordsComponent;
  let fixture: ComponentFixture<MilkRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MilkRecordsComponent ],
      providers: [BsModalService, ComponentLoaderFactory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilkRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
