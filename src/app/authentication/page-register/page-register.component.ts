import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiCallService } from '../../../app/services/api-call.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

    registerForm: FormGroup;
    isProcessing: boolean = false;
    errorMsg: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private apiCallService: ApiCallService, private spinnerService: NgxSpinnerService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }

    onSubmit() {
        this.spinnerService.show();
        this.isProcessing = true;

        if (this.registerForm.invalid) {
            return;
        }

        const payload = new Object();



        const username = this.registerForm.value.username;
        const email =  this.registerForm.value.email;
        const password = this.registerForm.value.password;
        const confirmPassword = this.registerForm.value.confirmPassword;

        payload['username'] = username;
        payload['password'] = password;
        payload['email'] = email;

        this.apiCallService.postData(environment.appUrl, payload).subscribe(
            (response: any) => {
                this.spinnerService.hide();
                if(response!==null){
                    this.isProcessing = false;
                    this.router.navigate(['/authentication/page-login']);
                }
                
            }, (error) => {
                this.spinnerService.hide();
                this.errorMsg = error.message;
            }
        )
    }

}
