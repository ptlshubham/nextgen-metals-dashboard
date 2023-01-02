import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';
import { customerData } from './customerdata';
import * as _ from 'underscore';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  validationForm!: FormGroup;
  openCustDetails: boolean = false;
  submitted = false;
  kyc: boolean = false;
  totalRecords = 0;
  startIndex = 1;
  endIndex = 5;
  page = 1;
  pageSize = 5;
  custData: any = {};
  typeOfUser:any;
  customerData: Customer[] = [];
  customer!: Array<Customer>;
  public customerModel: Customer = new Customer;
  filter:any;
  subfilter:any=[];
  public customers: Customer[] = [];
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute:ActivatedRoute,
    public dashboardService:DashboardService

  ) { 
    
  }

  ngOnInit(): void {
    this.customers=[];
    this.customerData=[];
    this.dashboardService.getAllUserList().subscribe((res:any)=>{
      this.customers = res;
      this.customers.forEach((element: any) => {
        element.location = element.street + ' ' + element.city + ' ' + element.state;
      })
    })
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.typeOfUser = res.type;
    });
    setTimeout(() => {
      if(this.typeOfUser == 'pendingKyc'){
        this.customers.forEach((element:any)=>{
          if(element.KYCStatus == false){
            this.customerData.push(element);
          }
        })
      }else if(this.typeOfUser == 'buyer'){
        this.customers.forEach((element:any)=>{
          if(element.KYCStatus == true && element.Role=='buyer'){
            this.customerData.push(element);
          }
        })
      }
        else if(this.typeOfUser==undefined){
          this.customerData=this.customers;
        }
      else{
        this.customers.forEach((element:any)=>{
          if(element.KYCStatus == true && element.Role=='seller'){
            this.customerData.push(element);
          }
        })
      }
    }, 600);
  }
  onFilterChnage(val:any){
    this.filter=val.value;
    if(this.filter=='role'){
      this.subfilter=[
        {
          name:'Buyer'
        },
        {
          name:'Seller'
        }
      ];
    }else if(this.filter=='quality'){
      this.subfilter=[
        {
          name:'Q1'
        },
        {
          name:'Q2'
        },
        {
          name:'Q3'
        }
      ];
    }else{
      this.subfilter=[
        {
          name:'Pending'
        },
        {
          name:'Done'
        }
      ];
    }
  }


  backToCustomer() {
    this.openCustDetails = false;
  }
  getFilterData(val:any){
    let key=val.value;
    this.customerData=[];
    if(key=='Buyer'){
      this.customers.forEach((element:any)=>{
        if(element.Role=='buyer'){
          this.customerData.push(element);
        }
      });
    }
    else if(key=='Seller'){
      this.customers.forEach((element:any)=>{
        if(element.Role=='seller'){
          this.customerData.push(element);
        } 
      });
    }
    else if(key=='Q1'){
      this.customers.forEach((element:any)=>{
        debugger
        if(element.MaterialQuality_.contains(['Q1,Q2,Q3'],'Q1')){
          debugger
          this.customerData.push(element);
        } 
      });
    }
    else if(key=='Q2'){
      this.customers.forEach((element:any)=>{
        debugger
        if(element.MaterialQuality_.contains(['Q1,Q2,Q3'],'Q2')){
          this.customerData.push(element);
        } 
      });
    }
    else if(key=='Q3'){
      this.customers.forEach((element:any)=>{
        if(element.MaterialQuality.contains('Q3')){
          this.customerData.push(element);
        } 
      });
    }
    else if(key=='Pending'){
      this.customers.forEach((element:any)=>{
        if(element.KYCStatus==false){
          this.customerData.push(element);
        } 
      });
    }else{
      this.customers.forEach((element:any)=>{
        if(element.KYCStatus==true){
          this.customerData.push(element);
        } 
      });
    }
  }
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.customerData = customerData.slice(this.startIndex - 1, this.endIndex - 1);
  }
  viewCustomerDetails(data: any) {
    debugger
    this.custData = data;
    this.customerModel = data;
    this.kyc = data.KYCStatus;
    this.openCustDetails = true;
  }
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If Verification is done then click on yes rather then cancel !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes!'
    }).then(result => {
      if (result.value) {
        // this.deleteMail();
        let data={
          id:this.custData.uid
        }
        this.dashboardService.updateKycUser(data).subscribe((res:any)=>{
          if(res == 'success'){
            Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
            this.openCustDetails = false;
            this.ngOnInit();
          }else{
            Swal.fire('oops!', 'Try after sometime', 'success');
          }
        })
        // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
      }
    });
  }


}
