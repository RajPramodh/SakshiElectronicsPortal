import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  closeButton: boolean = true;
  position: string = 'toast-top-right'


  constructor(private toastr: ToastrService) { }

  public info(msg: string, title?: string) {
    this.toastr.info(msg, title? title :'Info',{
      closeButton:this.closeButton,
      positionClass:this.position
    });
  }

  public success(msg: string, title?: string) {
    this.toastr.success(msg, title? title :'Success',{
      closeButton:this.closeButton,
      positionClass:this.position
    });
  }

  public warning(msg: string, title?: string) {
    this.toastr.warning(msg, title? title :'Warning',{
      closeButton:this.closeButton,
      positionClass:this.position
    });
  }

  public error(msg: string, title?: string) {
    this.toastr.error(msg, title? title :'Failed',{
      closeButton:this.closeButton,
      positionClass:this.position
    });
  }
}
