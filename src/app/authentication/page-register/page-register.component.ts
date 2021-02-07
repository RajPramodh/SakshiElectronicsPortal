import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiCallService } from '../../../app/services/api-call.service';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

    registerForm: FormGroup;
    isProcessing: boolean = false;
    errorMsg: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private apiCallService: ApiCallService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }

    onSubmit() {
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
                if(response!==null){
                    this.isProcessing = false;
                    this.router.navigate(['/authentication/page-login']);
                }
                
            }, (error) => {
                this.errorMsg = error.message;
            }
        )
    }

}
