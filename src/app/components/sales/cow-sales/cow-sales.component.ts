
import { formFields } from './../../../shared/form-fields';
import { CategoryFormFields } from './../../../shared/interface';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';

@Component({
    selector: 'app-cow-sales',
    standalone: true,
    templateUrl: './cow-sales.component.html',
    styleUrls: ['./cow-sales.component.scss'],
    imports: [CommonModule, BreadcrumbComponent]
})
export class CowSalesComponent {
    bsModalRef!: BsModalRef;
    dynamicFormFields: CategoryFormFields[] = formFields.createCowSaleRecord
    private modalService = inject(BsModalService)
    constructor() { }
  
    public openModalWithComponent() {
      const initialState: ModalOptions = {
        initialState: {
          title: 'Add Cow Sale Record',
          dynamicFormFields: this.dynamicFormFields
        },
        class: 'modal-md modal-dialog-centered',
      };
      this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
      this.bsModalRef.content.closeBtnName = 'Save Record';
    }
  }
