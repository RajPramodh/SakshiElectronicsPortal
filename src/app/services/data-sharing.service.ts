import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public loginResponse: any = [];

  constructor() { }

  private messageSource = new  BehaviorSubject(this.loginResponse);
  userDetails = this.messageSource.asObservable();

  public latestUserDetails(message: any) {
    this.messageSource.next(message)
    }

}
