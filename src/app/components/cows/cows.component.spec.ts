import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowsComponent } from './cows.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

describe('CowsComponent', () => {
  let component: CowsComponent;
  let fixture: ComponentFixture<CowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CowsComponent ],
      providers: [BsModalService, ComponentLoaderFactory]
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
