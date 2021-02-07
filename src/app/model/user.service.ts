import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}

export class LoginResponse{
  id: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}
