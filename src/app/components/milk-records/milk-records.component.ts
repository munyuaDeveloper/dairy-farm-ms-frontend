import { SharedService } from './../../shared/services/shared.service';
import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { CategoryFormFields, MilkRecord } from './../../shared/interface';
import { formFields } from './../../shared/form-fields';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';


@Component({
  selector: 'app-milk-records',
  standalone: true,
  templateUrl: './milk-records.component.html',
  styleUrls: ['./milk-records.component.scss'],
  imports: [CommonModule, BreadcrumbComponent]
})
export class MilkRecordsComponent {
  bsModalRef!: BsModalRef;
  dynamicFormFields: CategoryFormFields[] = formFields.createMilkCollectionRecord;

  $_milk_records!: Observable<any>


  cows: any[] = [];

  constructor(
    private modalService: BsModalService,
    private sharedService: SharedService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMilkRecords();
    this.getCows();
  }

  public openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Milk Record',
        dynamicFormFields: this.dynamicFormFields
      },
      class: 'modal-md modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Save Record';
    this.bsModalRef.content.action.pipe(take(1)).subscribe((value: any) => {
      this.createMilkRecord(value)
    });
  }

  createMilkRecord(body: any) {
    this.sharedService.postRequest('/api/v1/milk-collection-records', body)
      .pipe(
        take(1),
        tap(res => {
          this.messageService.showSuccess('Milk collection record created')
          this.getMilkRecords();
        })
      )
      .subscribe()
  }
  getMilkRecords() {
    this.$_milk_records = this.sharedService.getRequest('/api/v1/milk-collection-records')
      .pipe(map((res: any) => res.data));
  }
  getCows() {
    this.sharedService.getRequest('/api/v1/cow-records')
      .pipe(
        take(1),
        map((cows: any) => cows?.data.map((cow: any) => ({ _id: cow._id, name: cow.name }))),
        tap((res: any) => {
          this.cows = res;
          this.dynamicFormFields = this.assignFieldOptions(formFields.createMilkCollectionRecord)
        }),
      )
      .subscribe()
  }

  assignFieldOptions(fields: CategoryFormFields[]): CategoryFormFields[] {
    return fields.map(field => {
      if (field.input_type === 'SELECT' && field.code === 'cow') {
        field.field_options = this.cows;
      }
      return field;
    });
  }

  openModalToEdit(record: MilkRecord) {
    this.dynamicFormFields.map((res: CategoryFormFields) => {
      for (const [key, value] of Object.entries(record)) {
        if (res?.code === key) {
          res.value = (typeof value === 'string' || typeof value === 'number') ? value : value?._id ;
          break;
        }
      }
      return res;
    })

    const initialState: ModalOptions = {
      initialState: {
        title: 'Edit Milk Record',
        dynamicFormFields: this.dynamicFormFields
      },
      class: 'modal-md modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Save Record';
    this.bsModalRef.content.action.pipe(take(1)).subscribe((value: any) => {
      this.updateRecord(record, value)
    });
  }
  updateRecord(record: MilkRecord, body: any) {
    this.sharedService.putRequest('/api/v1/milk-collection-records', record?._id, body)
      .pipe(
        take(1),
        tap(res => {
          this.messageService.showSuccess('Record updated successfully')
          this.getMilkRecords();
        })
      )
      .subscribe()
  }
}
