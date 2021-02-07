import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { isNull } from 'util';
import { ApiCallService } from '../../services/api-call.service';
import {LoginResponse, UserService} from '../../model/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

	loginForm: FormGroup;
	isLoginRequested: boolean = false;
	isProcessing: boolean = false;
	errorMsg: String;
	loginResponse: LoginResponse;

	constructor(private readonly formBuilder: FormBuilder, public readonly userService: UserService, private readonly apiCallService: ApiCallService, private readonly router: Router) {

	}


	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		this.isProcessing = true;

		if (this.loginForm.invalid) {
			return;
		}

		const username = this.loginForm.value.username;
		const password = this.loginForm.value.password;

		const payload = new Object();
		payload['username'] = username;
		payload['password'] = password;

		const httpOptions = {
			headers: new HttpHeaders({
				'request': 'true'
			})
		};

		this.apiCallService.postData(environment.appUrl + '/api/auth/signin' ,payload ,httpOptions).subscribe(
			(response: any) => {
				console.log(response);
				if(response!==null){
					this.loginResponse = response;
				}

			},
			(error) => {

			}
		)

		// this.apiCallService.authorizeUser(environment.appUrl, username, password).subscribe(
		// 	(response: any) => {

		// 		if (!isNull(response)) {
		// 			this.authService.userName = response.userName;
		// 			this.authService.isAdmin = response.isAdmin;
		// 			this.authService.userId = response.userId;

		// 			localStorage.setItem('userId', response.userId);
		// 			localStorage.setItem('isAdmin', response.isAdmin);

		// 		} else {
		// 			this.errorMsg = response.errorMsg;
		// 		}

		// 		this.isProcessing = false;



		// 	},
		// 	(error) => {
		// 		this.isProcessing = false;
		// 		this.errorMsg = 'Something went wrong please contact admin';
		// 	}
		// )

		this.router.navigate(['/admin/dashboard/user-profiles']);
	}
}
