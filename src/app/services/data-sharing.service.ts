import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/user.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public loginResponse: any = [];

  constructor() { }


  /* Message Source*/
  private messageSource = new  BehaviorSubject(this.loginResponse);
  userDetails = this.messageSource.asObservable();


/* Assign Data */
  public latestUserDetails(message: any) {
    this.messageSource.next(message)
    }

}
