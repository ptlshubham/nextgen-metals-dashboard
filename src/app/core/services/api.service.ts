import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  TemplateRef } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:9000";
  toasts: any[] = [];
  constructor(
    private http: HttpClient,
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  public static userLoginURL: string = ApiService.HOST_URL + '/authenticate/userLogin';
  public static adminLoginURL: string = ApiService.HOST_URL + '/authenticate/adminLogin';
  public static RegisterNewCustomerURL: string = ApiService.HOST_URL + '/admin/RegisterNewUser';
  public static getBuyerListURL: string = ApiService.HOST_URL + '/admin/getAllBuyer';
  public static getAllUserListURL: string = ApiService.HOST_URL + '/admin/getAllUser';
  public static getSellerListURL: string = ApiService.HOST_URL + '/admin/getAllSeller';
  public static getKycPendingListURL: string = ApiService.HOST_URL + '/admin/getAllKYCPendingUser';
  public static updateKYCURL: string = ApiService.HOST_URL + '/admin/updateKYCUser';
  public static uploadMaterialImageURL: string = ApiService.HOST_URL + '/admin/UploadMaterialImage';
  
 
 
 
 
 


  //Cashfree APIS
  public static createCashfreeOrderURL: string = ApiService.HOST_URL + '/cashfree/createCashfreeOrder';


 

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
