import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { formFields } from './../../shared/form-fields';
import { CategoryFormFields } from './../../shared/interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-staffs',
    standalone: true,
    templateUrl: './staffs.component.html',
    styleUrls: ['./staffs.component.scss'],
    imports: [CommonModule, BreadcrumbComponent]
})
export class StaffsComponent {
    bsModalRef!: BsModalRef;
    dynamicFormFields: CategoryFormFields[] = formFields.createStaffRecord
  
    constructor(private modalService: BsModalService) { }
    
    public openModalWithComponent() {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Add Staff Record',
            dynamicFormFields: this.dynamicFormFields
          },
          class: 'modal-md modal-dialog-centered',
        };
        this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Save Record';
      }
}
