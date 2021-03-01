import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiCallService } from '../../../../app/services/api-call.service';
import { environment } from '../../../../../src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../../app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Input() editData: any;
  addEditForm: FormGroup;
  title:String;
  isEditForm: boolean;
 
  constructor(private readonly activeModal: NgbActiveModal,private readonly formBuilder: FormBuilder, private readonly apiCallService: ApiCallService,
    private notificationService: NotificationService, private spinnerService: NgxSpinnerService) { }
 
  ngOnInit(): void {
    console.log(this.editData);
    if(this.editData!==undefined){
      this.isEditForm = true;
      this.title ="Edit user profile";
      this.addEditForm = this.formBuilder.group({
        userId: [this.editData.id],
        userName: [this.editData.username],
        emailId: [this.editData.email],
        userRoles: [this.editData.roles],
      });
    } else{
      this.isEditForm = false;
      this.title ="Add new user";
      this.addEditForm = this.formBuilder.group({
        userId: [''],
        userName: [''],
        emailId: [''],
        userRoles: [''],
      });
    }
  }
    registerUser() {
      this.spinnerService.show();
      const payload = new Object();
      payload['userId'] = this.addEditForm.value.userId;
      payload['username'] = this.addEditForm.value.userName;
      payload['email'] = this.addEditForm.value.emailId;
      payload['password'] = 'password';
      payload['role'] = this.addEditForm.value.userRoles.split(',');

      const httpOptions = {
        headers: new HttpHeaders({
          'request': 'true'
        })
      };

        this.apiCallService.postData(environment.appUrl + '/auth/signup' ,payload ,httpOptions).subscribe(
          (response: any) => {
            this.spinnerService.hide();
            console.log(response);
            if(response!==null){
              this.notificationService.success('User details updated');
              console.log(response);
            }
    
          },
          (error) => {
            this.spinnerService.hide();
            this.notificationService.error(error.error.message);
            console.log(error);
          }
        )
    }
    
    get a() { return this.addEditForm.controls; }
 
  public decline() {
    this.activeModal.close(false);
  }
 
  public onSave() {
    console.log(this.addEditForm.value)
    this.registerUser();
    this.activeModal.close(true);
  }
 
  public dismiss() {
    this.activeModal.dismiss();
  }
  }

 
