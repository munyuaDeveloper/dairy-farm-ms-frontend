import { formFields } from './../../shared/form-fields';
import { CategoryFormFields } from './../../shared/interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';

@Component({
  selector: 'app-cows',
  standalone: true,
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.scss'],
  imports: [CommonModule, BreadcrumbComponent]
})
export class CowsComponent {

  bsModalRef!: BsModalRef;
  dynamicFormFields: CategoryFormFields[] = formFields.createCowRecord

  constructor(private modalService: BsModalService) { }

  public openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Cow Record',
        dynamicFormFields: this.dynamicFormFields
      },
      class: 'modal-md modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Save Record';
  }
}
