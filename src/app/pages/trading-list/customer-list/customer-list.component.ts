import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer.model';
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
  customerData!: Array<Customer>;
  public customerModel: Customer = new Customer;
  public customer: Customer[] = [];
  constructor(
    public formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.customerData = customerData;
    this.totalRecords = customerData.length;


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
    debugger
    this.customerModel.status = data.status;
    this.customerModel.cname = data.cname;
    this.customerModel.email = data.email;
    this.customerModel.location = data.location;
    this.customerModel.contact = data.contact;
    this.customerModel.role = data.role;
    this.customerModel.comname = data.comname;
    this.customerModel.quality = data.quality;
    this.customerModel.address = data.address;
    this.customerModel.gst = data.gst;
    this.customerModel.desigination = data.desigination;
    this.customerModel.workPhone = data.workPhone;
    this.kyc = data.status;
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
        Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
      }
    });
  }


}
