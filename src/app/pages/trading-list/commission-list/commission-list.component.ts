import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.scss']
})
export class CommissionListComponent implements OnInit {
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';

  tradeList: any = [
    {
      id: 1,
      Date: 11 - 10 - 2022,
      Order_ID: 'A0001',
      Buyer: 'Metals Planet',
      Seller: 'Today Steel',
      Quality: 'Q1',
      Quantity: 40,
      role:'buyer',
      commissionRate:50,
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
      Seller: 'Tata Metal',
      Quality: 'Q1',
      Quantity: 500,
      role:'seller',
      commissionRate:50,
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
      Seller: 'Air Steel',
      Quality: 'Q2',
      Quantity: 100,
      role:'buyer',
      commissionRate:50,
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
      Seller: 'Xyz Metals',
      Quality: 'Q3',
      Quantity: 10,
      role:'seller',
      commissionRate:50,
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
      Seller: 'Sagar Scrap',
      Quality: 'Q1',
      Quantity: 30,
      role:'buyer',
      commissionRate:50,
      Rate: 9600,
      Rate_validity: 44722,
      Delivery_terms: 7,
      Payment_terms: 9,
      Status_Commission: 'Received',
      Status_Delivery: 'Dispatched',
      Status_Payment: 'Pending'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
