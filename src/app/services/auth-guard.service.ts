import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private readonly routes: Router, private readonly authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.checkSessionActive()){
      return true;
    } else {
      this.routes.navigate(['/authentication']);
      return false;
    }
  }
}
