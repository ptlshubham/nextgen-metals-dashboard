import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
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
  public static completeProfileURL: string = ApiService.HOST_URL + '/admin/completeProfile';
  public static getUserDetailById: string = ApiService.HOST_URL + '/admin/getUserDetailById/'
  public static uploadCancelCheckImageURL: string = ApiService.HOST_URL + '/admin/UploadCancelCheckImage';

  //trading

  public static newTradeRequestURL: string = ApiService.HOST_URL + '/trading/newTradeRequest';
  public static getAllTradingDatabyIdForBuyerURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyIdForBuyer';
  public static getAllTradingDatabyIdForSellerURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyIdForSeller';
  public static getAllTradingDatabyIdURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyId';
  public static getNewTradingReqForSellerURL: string = ApiService.HOST_URL + '/trading/getNewTradingReqForSeller';
  public static saveSellerTradeRequestURL: string = ApiService.HOST_URL + '/trading/saveSellerTradeRequest';
  public static newComissionPaymentForBuyerURL: string = ApiService.HOST_URL + '/trading/NewComissionPaymentForBuyer';
  public static newComissionPaymentForSellerURL: string = ApiService.HOST_URL + '/trading/NewComissionPaymentForSeller';
  public static uploadWeightSlipImageURL: string = ApiService.HOST_URL + '/trading/UploadWeightSlipImage';
  public static uploadDeliveryRecieptImageURL: string = ApiService.HOST_URL + '/trading/UploadDeliveryRecieptImage';
  public static saveTransporterDetailsURL: string = ApiService.HOST_URL + '/trading/SaveTransporterDetails';
  public static getTransporterDetailsbyIdForSellerURL: string = ApiService.HOST_URL + '/trading/GetTransporterDetailsbyIdForSeller';
  public static uploadPaymentSlipImageURL: string = ApiService.HOST_URL + '/trading/UploadPaymentSlipImage';
  public static saveBuyerPaymentDetailsURL: string = ApiService.HOST_URL + '/trading/SaveBuyerPaymentDetails';

  




  //Cashfree APIS
  public static createCashfreeOrderURL: string = ApiService.HOST_URL + '/cashfree/createCashfreeOrder';




  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {

    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
