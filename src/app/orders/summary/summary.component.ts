import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../app/services/notification.service';
import { environment } from '../../../environments/environment';
import { ApiCallService } from '../../../app/services/api-call.service';
import { SidebarService } from '../../../app/services/sidebar.service';
import { DataSharingService } from '../../../app/services/data-sharing.service';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

	sourceData = new LocalDataSource();

	fileUploadForm: FormGroup;
	fileInputLabel: string;

	public sidebarVisible: boolean = true;
	public showInboxMenu: boolean = false;

	tableHeaders = ['Order Id', 'Used Item Info', 'Buy Back Category', 'New Product Category', 'City', 'Partner Email', 'Order Date', 'Base Exchange Value', 'Sponsored Value', 'Sponsor Email', 'Diagnostic Discount', 'Diagnostic Test Status', 'Order Status'];
	tableKeyHeaders = ['orderId', 'usedItemInfo', 'buyBackCategory', 'newProductCategory', 'city', 'partnerEmail', 'orderDate', 'baseExchangeValue', 'sponsoredValue', 'sponsorEmail', 'diagnosticDiscount', 'diagnosticTestStatus', 'orderStatus'];

	data = [
		{
		  "ID" : "1",
		  "Name" : "Rahul",
		  "Age" : "21",
		  "Gender" : "Male",
		  "Country" : "India"
		},
		{
		  "ID" : "2",
		  "Name" : "Ajay",
		  "Age" : "25",
		  "Gender" : "Male",
		  "Country" : "India"
		}];

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private apiCallService: ApiCallService, private notificationService: NotificationService, private spinnerService: NgxSpinnerService
		, public dataSharingService: DataSharingService, private readonly formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.callOrderSummaryApi();
		//this.sourceData.load(this.data);
		this.fileUploadForm = this.formBuilder.group({
			file: ['']
		  });
	}

	// handleFileInput(files: FileList) {
	// 	this.fileToUpload = files.item(0);
	// }

	onFileSelect(event) {
		let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			// console.log(file);

			if (!_.includes(af, file.type)) {
				alert('Only EXCEL Docs Allowed!');
			} else {
				this.fileInputLabel = file.name;
				this.fileUploadForm.get('file').setValue(file);
			}
		}
	}

	onFormSubmit() {

		if (!this.fileUploadForm.get('file').value) {
			alert('Please fill valid details!');
			return false;
		}
		this.spinnerService.show();

		const formData = new FormData();
		formData.append('file', this.fileUploadForm.get('file').value);

		const payload = new Object();
		payload['file'] = formData.get('file');


		const tokenType = this.dataSharingService.loginResponse.tokenType;
		const accessToken = this.dataSharingService.loginResponse.accessToken;

		const httpOptions = {
		  headers: new HttpHeaders({
			'Authorization': tokenType + ' ' + accessToken
		  })
		};


		this.apiCallService.postData(environment.appUrl + '/excel/uploadExcel', formData, httpOptions).subscribe(
			(response: any) => {
				this.spinnerService.hide();
				console.log(response);
				if (response !== null) {
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
	
	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
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
		  id: {
			title: 'Order Id',
		  },
		  subjectLine: {
			title: 'Subject Line',
		  },
		  description: {
			title: 'Description',
		  },
		  status: {
			title: 'Status',
		  },
		  dispatched: {
			title: 'Dispatched',
		  }
		},
		attr: {
		  class: 'table table-bordered'
		},
	  };
	 
	
	 
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


	callOrderSummaryApi(){

		this.spinnerService.show();

		const tokenType = this.dataSharingService.loginResponse.tokenType;
		const accessToken = this.dataSharingService.loginResponse.accessToken;

		const httpOptions = {
		  headers: new HttpHeaders({
			'Authorization': tokenType + ' ' + accessToken
		  })
		};


		this.apiCallService.getData(environment.appUrl + '/excel/getCompleteExcelData', httpOptions).subscribe(
			(response: any) => {
				this.spinnerService.hide();
				this.data = response;
				if (response !== null) {
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


}
