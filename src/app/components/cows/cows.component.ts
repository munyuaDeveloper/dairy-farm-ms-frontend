import { SharedService } from './../../shared/services/shared.service';
import { formFields } from './../../shared/form-fields';
import { CategoryFormFields, CowRecord } from './../../shared/interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { Observable, map, take, tap } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-cows',
  standalone: true,
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.scss'],
  imports: [CommonModule, BreadcrumbComponent]
})
export class CowsComponent {

  bsModalRef!: BsModalRef;
  dynamicFormFields: CategoryFormFields[] = formFields.createCowRecord;
  $_cow_records!: Observable<any>;
  cow_records = [];

  cow_categories = [];

  constructor(
    private modalService: BsModalService,
    private sharedService: SharedService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getCowRecords();
    this.getCowCategories();
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Cow Record',
        dynamicFormFields: this.dynamicFormFields
      },
      class: 'modal-md modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Save Record';
    this.bsModalRef.content.action.pipe(take(1)).subscribe((value: any) => {
      this.createCowRecord(value)
    });
  }

  createCowRecord(body: any) {
    this.sharedService.postRequest('/api/v1/cow-records', body)
      .pipe(
        take(1),
        tap(res => {
          this.messageService.showSuccess('Cow record created')
          this.getCowRecords();
        })
      )
      .subscribe()
  }
  getCowRecords() {
    this.$_cow_records = this.sharedService.getRequest('/api/v1/cow-records')
      .pipe(
        map((res: any) => res.data),
        tap((res) => {
          this.cow_records = res.filter((res: any) => res.category.name === 'Milker')
          this.dynamicFormFields = this.assignFieldOptions(formFields.createCowRecord, 'dam', 'cow_records')
        })
      );
  }
  getCowCategories() {
    this.sharedService.getRequest('/api/v1/cow-categories')
      .pipe(
        take(1),
        map((cows: any) => cows?.data.map((cow: any) => ({ _id: cow._id, name: cow.name }))),
        tap((res: any) => {
          this.cow_categories = res;
          this.dynamicFormFields = this.assignFieldOptions(formFields.createCowRecord, 'category', 'cow_categories')
        }),
      )
      .subscribe()
  }

  assignFieldOptions(fields: CategoryFormFields[], code: string, variableName: keyof CowsComponent): CategoryFormFields[] {
    return fields.map(field => {
      if (field.input_type === 'SELECT' && field.code === code) {
        field.field_options = this[variableName] as any[];
      }
      return field;
    });
  }

  openModalToEdit(record: CowRecord) {
    this.dynamicFormFields.map((res: CategoryFormFields) => {
      for (const [key, value] of Object.entries(record)) {
        if (res?.code === key) {
          res.value = typeof value === 'string' ? value : value?._id ;
          break;
        }
      }
      return res;
    })

    const initialState: ModalOptions = {
      initialState: {
        title: 'Edit Cow Record',
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
  updateRecord(record: CowRecord, body: any) {
    this.sharedService.putRequest('/api/v1/cow-records', record?._id, body)
      .pipe(
        take(1),
        tap(res => {
          this.messageService.showSuccess('Record updated successfully')
          this.getCowRecords();
        })
      )
      .subscribe()
  }
}
