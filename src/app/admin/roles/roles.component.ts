import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCallService } from '../../../app/services/api-call.service';
import { NotificationService } from '../../../app/services/notification.service';
import { environment } from '../../../environments/environment';
import { EditFormComponent } from '../user-profiles/edit-form/edit-form.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

    
  sourceData = new LocalDataSource();
 
  constructor(private apiCallService: ApiCallService, private notificationService: NotificationService, private spinnerService: NgxSpinnerService) { }
 
  ngOnInit() {
    this.sourceData.load(this.data);
  }
 
  settings = {
 
    saveButtonContent: 'Save',
    cancelButtonContent: 'Cancel',
    deleteButtonContent: 'Delete',

    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i  class="fa fa-trash-o delete-icon" aria-hidden="true"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fa fa-pencil-square-o edit-icon" aria-hidden="true"></i>'
    },
    add: {
      confirmCreate: true,
    },
    columns: {
      rolename: {
        title: 'Role Name',
      },
      desc: {
        title: 'Role Description',
      }
    },
    attr: {
      class: 'table table-bordered'
    },
  };
 
  data = [
    {
      id: 1,
      rolename: "Admin",
      desc: "Have complete control on application"
    },
    {
        id: 2,
        rolename: "Zone Admin",
        desc: "Have access to specific zonesVisibility and actions of admin but only for the cities assigned to them."
    },
    {
        id: 3,
        rolename: "Accounts",
        desc: "Invoices and transaction updates"
    },
    {
        id: 4,
        rolename: "City POC",
        desc: "Mark orders receive or not received"
    }
  ];

 
  onEdit(rowData: any) {
    console.log(rowData);
  }
 
  onAdd(rowData: any) {
    console.log(rowData);
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
        this.apiCallService.deleteData(environment.appUrl + '/roles/' + event.data.id, httpOptions ).subscribe(
          (response: any) => {
            console.log(response);
            if(response!==null){
              this.spinnerService.hide();
              this.notificationService.success('Role deleted');
              console.log(response);
              event.confirm.resolve();
            }
    
          },
          (error) => {
            this.spinnerService.hide();
            this.notificationService.error('Failed to delete the role');
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
    event.confirm.resolve();
  }
 
  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
    this.sourceData.update(event.data, event.newData);
    event.confirm.resolve();
  }
}
 
