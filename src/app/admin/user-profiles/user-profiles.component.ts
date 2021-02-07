import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  settings = {

    saveButtonContent: 'save',
    cancelButtonContent: 'cancel',
    
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i  class="fa fa-trash-o delete-icon" aria-hidden="true"></i>',
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fa fa-pencil-square-o edit-icon" aria-hidden="true"></i>'
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

  }

  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
  }
}
