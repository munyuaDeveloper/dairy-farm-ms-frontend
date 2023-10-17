import { SharedService } from './../../shared/services/shared.service';
import { formFields } from './../../shared/form-fields';
import { CategoryFormFields } from './../../shared/interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { Observable, map, take, tap } from 'rxjs';

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
  $_cow_records!: Observable<any>

  cow_categories = [];

  constructor(
    private modalService: BsModalService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getCowRecords();
    this.getCows();
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
          this.getCowRecords();
        })
      )
      .subscribe()
  }
  getCowRecords() {
    this.$_cow_records = this.sharedService.getRequest('/api/v1/cow-records')
      .pipe(map((res: any) => res.data));
  }
  getCows() {
    this.sharedService.getRequest('/api/v1/cow-categories')
      .pipe(
        take(1),
        map((cows: any) => cows?.data.map((cow: any) => ({ id: cow._id, name: cow.name }))),
        tap((res: any) => {
          this.cow_categories = res;
          this.dynamicFormFields = this.assignFieldOptions(formFields.createCowRecord)
        }),
      )
      .subscribe()
  }

  assignFieldOptions(fields: CategoryFormFields[]): CategoryFormFields[] {
    return fields.map(field => {
      if (field.input_type === 'SELECT' && field.code === 'category') {
        field.field_options = this.cow_categories;
      }
      return field;
    });
  }
}
