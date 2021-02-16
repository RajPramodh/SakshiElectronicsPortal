import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Input() editData: any;
  addEditForm: FormGroup;
  title:String;
 
  constructor(private readonly activeModal: NgbActiveModal,private readonly formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    console.log(this.editData);
    if(this.editData!==undefined){
      this.title ="Edit user profile";
      this.addEditForm = this.formBuilder.group({
        userId: [this.editData.Id],
        userName: [this.editData.username],
        emailId: [this.editData.email],
        userRoles: [this.editData.roles],
      });
    }
    else{
      this.title ="Add new user";
      this.addEditForm = this.formBuilder.group({
        userId: [''],
        userName: [''],
        emailId: [''],
        userRoles: [''],
      });
    }
  }
 
  get a() { return this.addEditForm.controls; }
 
  public decline() {
    this.activeModal.close(false);
  }
 
  public onSave() {
    console.log(this.addEditForm.value)
    this.activeModal.close(true);
  }
 
  public dismiss() {
    this.activeModal.dismiss();
  }
 
}
 
