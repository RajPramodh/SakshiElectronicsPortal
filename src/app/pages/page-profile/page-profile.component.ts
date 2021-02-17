import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginResponse } from '../../../app/model/user.service';
import { DataSharingService } from '../../../app/services/data-sharing.service';
import { ApiCallService } from '../../../app/services/api-call.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-page-profile',
	templateUrl: './page-profile.component.html',
	styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnDestroy {

	updateProfileForm: FormGroup;
	profileDetails: LoginResponse;
	isEditClicked: boolean = false;

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;
    public fragment: string = "settings";
    private ngUnsubscribe = new Subject();

	constructor(private readonly formBuilder: FormBuilder,private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, 
		public dataSharingService: DataSharingService, public apiCallService: ApiCallService, private toastr: ToastrService,private notificationService: NotificationService, private spinnerService: NgxSpinnerService) {
        this.activatedRoute.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: string) => {
			if (fragment) {
				this.fragment = fragment;
			}
		});
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}

	ngOnInit() {
		
		// this.dataSharingService.userDetails.subscribe(
		// 	userData => this.profileDetails = userData
		// );
		this.profileDetails = this.dataSharingService.loginResponse;
		this.updateProfileForm = this.formBuilder.group({
			userId: [this.profileDetails.id],
			userName: [this.profileDetails.username],
			emailId: [this.profileDetails.email],
			mobileNo: [''],
		});
		this.updateProfileForm.disable();
	}

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
	}
	
	onEditForm(){
		this.isEditClicked = true;
		this.updateProfileForm.enable();
		this.updateProfileForm.get('userId').disable();
	}

	onCancelEdit(){
		this.isEditClicked = false;
		this.updateProfileForm.disable();
	}

	onSaveEdit(){
		this.spinnerService.show();
		this.updateProfileForm.disable();
		
		if (this.updateProfileForm.invalid) {
			return;
		}


		const payload = new Object();
		payload['username'] = this.updateProfileForm.value.userName;
		payload['email'] = this.updateProfileForm.value.emailId;
		payload['mobile'] = this.updateProfileForm.value.mobileNo;
		payload['id'] = this.updateProfileForm.value.userId;

		const httpOptions = {
			headers: new HttpHeaders({
				'request': 'true'
			})
		};


		this.apiCallService.putData(environment.appUrl + '/auth/signin' ,payload ,httpOptions).subscribe(
			(response: any) => {
				this.spinnerService.hide();
				console.log(response);
				if(response!==null){ 

					// this.dataSharingService.loginResponse = response;
					// this.authService.setSession(this.dataSharingService.loginResponse);
					// this.dataSharingService.latestUserDetails(response);
						this.notificationService.success('Profile Information Saved ');
					// this.router.navigate(['/admin/user-profiles']);
						this.isEditClicked = false;
				}

			},
			(error) => {
				this.spinnerService.hide();
				this.notificationService.error(error.message);
				this.onEditForm();
				console.log(error);
			}
		)
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	loadLineChartOptions(data, color) {
		let chartOption: EChartOption;
		let xAxisData: Array<any> = new Array<any>();

		data.forEach(element => {
			xAxisData.push("");
		});

		return chartOption = {
			xAxis: {
				type: 'category',
				show: false,
				data: xAxisData,
				boundaryGap: false,
			},
			yAxis: {
				type: 'value',
				show: false
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params, ticket, callback) {
					return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				top: '0%',
				containLabel: false
			},
			series: [{
				data: data,
				type: 'line',
				showSymbol: false,
				symbolSize: 1,
				lineStyle: {
					color: color,
					width: 1
				}
			}]
		};
	}

}
