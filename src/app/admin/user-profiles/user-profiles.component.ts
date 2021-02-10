import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
 
@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {
 
  sourceData = new LocalDataSource();
 
  constructor() { }
 
  ngOnInit() {
    this.sourceData.load(this.data);
  }
 
  settings = {
 
    saveButtonContent: 'save',
    cancelButtonContent: 'cancel',
 
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
      roles: "role1",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      roles: "role2",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
 
    {
      id: 11,
      roles: "role3",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
 
  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
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
