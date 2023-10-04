import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { CategoryFormFields } from './../../shared/interface';
import { formFields } from './../../shared/form-fields';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-milk-records',
    standalone: true,
    templateUrl: './milk-records.component.html',
    styleUrls: ['./milk-records.component.scss'],
    imports: [CommonModule, BreadcrumbComponent]
})
export class MilkRecordsComponent {
    bsModalRef!: BsModalRef;
    dynamicFormFields: CategoryFormFields[] = formFields.createMilkCollectionRecord
  
    constructor(private modalService: BsModalService) { }
    
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
      }
}
