import { SharedService } from './../../shared/services/shared.service';
import { DialogFormComponent } from 'src/app/shared/dialog-form/dialog-form.component';
import { formFields } from './../../shared/form-fields';
import { CategoryFormFields } from './../../shared/interface';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../layout/breadcrumb/breadcrumb.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, map, take, tap } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-staffs',
  standalone: true,
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
  imports: [CommonModule, BreadcrumbComponent]
})
export class StaffsComponent implements OnInit {
  bsModalRef!: BsModalRef;
  dynamicFormFields: CategoryFormFields[] = formFields.createStaffRecord;
  $_staffs!: Observable<any>

  constructor(
    private modalService: BsModalService,
    private sharedService: SharedService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserRecords()
  }

  getUserRecords() {
    this.$_staffs = this.sharedService.getRequest('/api/v1/users')
      .pipe(map((res: any) => res.data));
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Staff Record',
        dynamicFormFields: this.dynamicFormFields
      },
      class: 'modal-md modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Save Record';
    this.bsModalRef.content.action.pipe(take(1)).subscribe((value: any) => {
      this.createUserRecord(value)
    });
  }

  createUserRecord(body: any) {
    this.sharedService.postRequest('/api/v1/users', body)
      .pipe(
        take(1),
        tap(res => {
          this.messageService.showSuccess('User record created')
          this.getUserRecords();
        })
      )
      .subscribe()
  }
}
