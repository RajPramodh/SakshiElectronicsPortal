import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthService } from '../shared/auth.service';
import { AppConstants } from '../commons/app-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  static apiCallService: ApiCallService;

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': AppConstants.APPLICATION_JSON,
      'Content-Type': AppConstants.APPLICATION_JSON,
    }),
  };

  constructor(private readonly httpClient: HttpClient) {
    ApiCallService.apiCallService = this;
  }

  getData(requestUrl: string, headerReq?: any): Observable<any> {
    return this.httpClient.get<object>(requestUrl, headerReq ? headerReq : this.httpOptions);
  }

  deleteData(requestUrl: string, headerReq?: any): Observable<any> {
    return this.httpClient.delete<object>(requestUrl, headerReq ? headerReq : this.httpOptions);
  }

  putData(requestUrl: string, requestBody: any, headerReq?: any): Observable<any> {
    return this.httpClient.put<object>(requestUrl, requestBody, headerReq ? headerReq : this.httpOptions);
  }

  postData(requestUrl: string, requestBody: any, headerReq?: any): Observable<any> {
    console.log(requestBody);
    console.log(headerReq);
    return this.httpClient.post<object>(requestUrl, requestBody, headerReq ? headerReq : this.httpOptions);
  }

  authorizeUser(requestUrl: string, username: string, password: string): Observable<any> {
    const auth = window.btoa(`${username}:${password}`);
    let headers = new HttpHeaders().set('X-Authorization', `Basic ${auth}`);
    return this.httpClient.get<Object>(requestUrl, { headers });
  }

}
