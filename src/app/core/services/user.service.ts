import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /**
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /**
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
    registerUser(data: any) {
        return this.http.post(ApiService.RegisterNewCustomerURL, data);
    }

    userLogin(email: any, pass: any, role: any) {
        let data = {
            email: email,
            pass: pass,
            role: role
        };
        return this.http.post(ApiService.userLoginURL, data);
    }

    adminLogin(email: any, pass: any) {
        let data = {
            email: email,
            pass: pass
        };
        return this.http.post(ApiService.adminLoginURL, data);
    }
    uploadCancelCheckImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadMaterialImageURL, img);

    }

    completeProfile(data:any){
        return this.http.post(ApiService.completeProfileURL,data);
    }

    getUserDetail(id:any){
        return this.http.get(ApiService.getUserDetailById+id)
    }
}
