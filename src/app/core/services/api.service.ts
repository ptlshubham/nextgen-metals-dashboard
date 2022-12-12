import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  public static uploadMaterialMultiImageURL: string = ApiService.HOST_URL + '/admin/UploadMaterialMultiImage';
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
  public static invoiceRecieptImageUploadURL: string = ApiService.HOST_URL + '/trading/InvoiceRecieptImageUpload';
  public static saveDileveryRecieptDataURL: string = ApiService.HOST_URL + '/trading/SaveDeliveryRecieptData';
  //Cashfree APIS
  public static createCashfreeOrderURL: string = ApiService.HOST_URL + '/cashfree/createCashfreeOrder';


  
  // show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
  //   this.toasts.push({ textOrTpl, ...options });
  // }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  
  showNotification(from: any, align: any, msg: any, color: any) {
  

    var color = color;

    $.notify({
      icon: "",
      message: msg
    }, {
      type: color,
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="fa fa-times"></i></button> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
  }

}
