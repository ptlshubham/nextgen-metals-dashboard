import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;

  @Input() public customerDetails!: Customer;
  public customerModel: Customer = new Customer;
  // public customer: Customer[] = [];
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  disabled:boolean = true;
  role: any = '';
  tradeList: any = [
    {
      id: 1,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0001',
      Buyer: 'Metals Planet',
      location: 'Delhi Gurgaon',
      Seller: 'Today Steel',
      Quality: 'Q1',
      Quantity: 40,
      Rate: 2000,
      Rate_validity: 44566,
      Delivery_terms: 10,
      Payment_terms: 6,
      Status_Commission: 'Received',
      Status_Delivery: 'Pending',
      Status_Payment: 'Pending'
    },
    {
      id: 2,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0002',
      Buyer: 'Tata Metal',
      location: 'Delhi Gurgaon',
      Seller: 'Tata Metal',
      Quality: 'Q1',
      Quantity: 500,
      Rate: 1800,
      Rate_validity: 44598,
      Delivery_terms: 5,
      Payment_terms: 'Advance',
      Status_Commission: 'Not received',
      Status_Delivery: 'Dispatched',
      Status_Payment: 'Complete'
    },
    {
      id: 3,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0003',
      Buyer: 'Jindal Steel',
      location: 'Delhi Gurgaon',
      Seller: 'Air Steel',
      Quality: 'Q2',
      Quantity: 100,
      Rate: 10000,
      Rate_validity: 44696,
      Delivery_terms: 8,
      Status_Commission: 'Received',
      Status_Delivery: 'Delivered',
      Status_Payment: 'Pending'
    },
    {
      id: 4,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0004',
      Buyer: 'Indra Steel',
      location: 'Delhi Gurgaon',
      Seller: 'Xyz Metals',
      Quality: 'Q3',
      Quantity: 10,
      Rate: 6000,
      Rate_validity: 44571,
      Delivery_terms: 9,
      Payment_terms: 3,
      Status_Commission: 'Received',
      Status_Delivery: 'Pending',
      Status_Payment: 'Pending'
    },
    {
      id: 5,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0005',
      Buyer: 'Yoyo Metals',
      location: 'Delhi Gurgaon',
      Seller: 'Sagar Scrap',
      Quality: 'Q1',
      Quantity: 30,
      Rate: 9600,
      Rate_validity: 44722,
      Delivery_terms: 7,
      Payment_terms: 9,
      Status_Commission: 'Received',
      Status_Delivery: 'Dispatched',
      Status_Payment: 'Pending'
    }
  ]
  constructor(
    public formBuilder: FormBuilder
  ) {
   
    this.getCustomerDetails();
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      select: [{value: '', disabled: true}, [Validators.required ] ],
      selectR: ['', [Validators.required]],
      selectM: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      companyname: ['', [Validators.required]],
      desgination: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      workphone: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
    });

  }
  get f() { return this.validationForm.controls; }

  getCustomerDetails() {
    this.customerDetails;
    // this.customerModel.status = this.customer.status;
    // this.customerModel.cname = this.customer.cname;
    // this.customerModel.email = this.customer.email;
    // this.customerModel.location = this.customer.location;
    // this.customerModel.contact = this.customer.contact;
    // this.customerModel.role = this.customer.role;
    // this.customerModel.comname = this.customer.comname;
    // this.customerModel.quality = this.customer.quality;
    // this.customerModel.address = this.customer.address;
    // this.customerModel.gst = this.customer.gst;
    // this.customerModel.desigination = this.customer.desigination;
    // this.customerModel.workPhone = this.customer.workPhone;
  }
}
