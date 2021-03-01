import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ApiCallService } from '../../services/api-call.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { NotificationService } from '../../services/notification.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordResetForm: FormGroup;
  public sidebarVisible: boolean = true;

  constructor(private router: Router, private readonly formBuilder: FormBuilder,private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, 
    public dataSharingService: DataSharingService, public apiCallService: ApiCallService, private toastr: ToastrService,private notificationService: NotificationService, 
    private spinnerService: NgxSpinnerService, private authService: AuthService) { }
  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
			userId: [''],
			userName: [''],
			emailId: [''],
			mobileNo: [''],
		});
  }

  onSubmit() {

    this.router.navigate(['/authentication/page-login']);
}

}
