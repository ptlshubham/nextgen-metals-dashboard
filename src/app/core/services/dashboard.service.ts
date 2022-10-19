import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

   
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
    registerUser(data:any){
     return  this.http.post(ApiService.RegisterNewCustomerURL,data);
    }
    getBuyerList(){
        return  this.http.get(ApiService.getBuyerListURL);
    }
    getAllUserList(){
        return  this.http.get(ApiService.getAllUserListURL);
    }
    getSellerList(){
        return  this.http.get(ApiService.getSellerListURL);
    }
    getKycPendingList(){
        return  this.http.get(ApiService.getKycPendingListURL);
    }
    updateKycUser(data:any){
        return this.http.post(ApiService.updateKYCURL , data)
    }
}
