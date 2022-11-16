import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
    constructor(
        private http: HttpClient
    ) { }


    newTraderequest(data: any) {
        return this.http.post(ApiService.newTradeRequestURL, data);
    }

    saveSellerTradeRequest(data: any) {
        return this.http.post(ApiService.saveSellerTradeRequestURL, data);
    }

    getAllTradingDatabyIdForSeller(id: any) {
        let data = {
            uid: id
        };
        return this.http.post(ApiService.getAllTradingDatabyIdForSellerURL, data);
    }

    getAllTradingDatabyIdForBuyer(id: any) {
        let data = {
            uid: id
        };
        return this.http.post(ApiService.getAllTradingDatabyIdForBuyerURL, data);
    }
    newTradeReqForSeller() {
        let data = {
            mat_qlty: localStorage.getItem('material_quality')
        };
        return this.http.post(ApiService.getNewTradingReqForSellerURL, data);
    }
    comissionPaymentForBuyer(data: any) {
        return this.http.post(ApiService.newComissionPaymentForBuyerURL, data);

    }
    comissionPaymentForSeller(data: any) {
        return this.http.post(ApiService.newComissionPaymentForSellerURL, data);

    }
    uploadWeightSlipImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadWeightSlipImageURL, img);

    }
    uploadrDeliveryRecieptImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadDeliveryRecieptImageURL, img);

    }
    saveTransporterDetails(data:any){
        return this.http.post(ApiService.saveTransporterDetailsURL, data);  
    }

}