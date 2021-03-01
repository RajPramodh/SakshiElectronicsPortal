import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../app/services/notification.service';
import { environment } from '../../../environments/environment';
import { ApiCallService } from '../../../app/services/api-call.service';
import { EditFormComponent } from './edit-form/edit-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {
 
  sourceData = new LocalDataSource();
 
  constructor(private readonly modalService: NgbModal, private apiCallService: ApiCallService, private notificationService: NotificationService, private spinnerService: NgxSpinnerService) { }
 
  ngOnInit() {
    this.sourceData.load(this.data);
  }
 
  settings = {
 
    saveButtonContent: 'save',
    cancelButtonContent: 'cancel',
 
    actions: {
      edit: false,
      add: false,
      custom: [{ name: 'onEdit', title: "<i class='fa fa-pencil-square-o edit-icon' aria-hidden='true'></i>" }],
      position: 'left'
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i  class="fa fa-trash-o delete-icon" aria-hidden="true"></i>',
    },
    // edit: {
    //   confirmSave: true,
    //   editButtonContent: '<i class="fa fa-pencil-square-o edit-icon" aria-hidden="true"></i>'
    // },
    // add: {
    //   confirmCreate: true,
    // },
    columns: {
      id: {
        title: 'ID',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
      roles: {
        title: 'User Roles'
      }
    },
    attr: {
      class: 'table table-bordered'
    },
  };
 
  data = [
    {
      id: 1,
      roles: "user",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      roles: "admin",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
 
    {
      id: 11,
      roles: "admin",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
 
  onCustomAction(event) {
    switch (event.action) {
      case 'onEdit':
        this.onEdit(event.data);
    }
  }
 
  onEdit(rowData: any) {
    const modalRef = this.modalService.open(EditFormComponent, { size: 'lg', backdropClass: 'in', windowClass: 'modal-holder', centered: true });
    modalRef.componentInstance.editData = rowData;
  }
 
  onAdd() {
    this.modalService.open(EditFormComponent, { size: 'lg', backdropClass: 'in', windowClass: 'modal-holder', centered: true });
  }
 
  onDeleteConfirm(event) {

    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.spinnerService.show(); 
      const httpOptions = {
        headers: new HttpHeaders({
          'request': 'true'
        })
      };
        this.apiCallService.deleteData(environment.appUrl + '/profile/' + event.data.id, httpOptions ).subscribe(
          (response: any) => {
            console.log(response);
            if(response!==null){
              this.spinnerService.hide();
              this.notificationService.success('User deleted');
              console.log(response);
              event.confirm.resolve();
            }
    
          },
          (error) => {
            this.spinnerService.hide();
            this.notificationService.error('Failed to delete the user');
            console.log(error);
            event.confirm.reject();
          }
        )
    } else {
      event.confirm.reject();
    }
  }
 
  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    this.data.push(event.newData)
    this.sourceData.load(this.data);
    event.confirm.resolve();
  }
 
  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
    this.sourceData.update(event.data, event.newData);
    event.confirm.resolve();
  }
}
 
