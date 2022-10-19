import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';
import { customerData } from './customerdata';

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
      debugger
    })
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.typeOfUser = res.type;
    });
    setTimeout(() => {
      if(this.typeOfUser == 'pendingKyc'){
        debugger
        this.customers.forEach((element:any)=>{
          if(element.KYC_status == false){
            this.customerData.push(element);
          }
        })
      }else if(this.typeOfUser == 'buyer'){
        this.customers.forEach((element:any)=>{
          if(element.KYC_status == true && element.role=='buyer'){
            this.customerData.push(element);
          }
        })
      }else{
        this.customers.forEach((element:any)=>{
          if(element.KYC_status == true && element.role=='seller'){
            this.customerData.push(element);
          }
        })
      }
    }, 600);
  }


  backToCustomer() {
    this.openCustDetails = false;

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
    this.custData = data;
    this.customerModel = data;
    this.kyc = data.KYC_status;
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
          id:this.custData.id
        }
        this.dashboardService.updateKycUser(data).subscribe((res:any)=>{
          debugger
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
