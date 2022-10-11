import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-trade-summary',
  templateUrl: './seller-trade-summary.component.html',
  styleUrls: ['./seller-trade-summary.component.scss']
})
export class SellerTradeSummaryComponent implements OnInit {
  sellerTrade: any = [
    { id: 1, oid: 'A02501', 'sname': 'Xyz', quality: 'Q1', quantity: 50, rate: 45000, terms: 7, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'IDEAL' },
    { id: 2, oid: 'A02502', 'sname': 'abc', quality: 'Q1', quantity: 40, rate: 40000, terms: 5, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'ACCEPTED' },
    { id: 3, oid: 'A02503', 'sname': 'cdf', quality: 'Q2', quantity: 30, rate: 4000, terms: 6, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'PENDING' },
    { id: 4, oid: 'A02504', 'sname': 'fhg', quality: 'Q3', quantity: 20, rate: 5000, terms: 3, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'REJECTED' },
    { id: 5, oid: 'A02505', 'sname': 'shu', quality: 'Q1', quantity: 10, rate: 30000, terms: 5, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'PENDING' }

  ]
  sellerModel: any = {};
  paymentOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  acceptAndPay(data: any) {
    this.sellerModel = data;
    this.paymentOpen = true;
  }
}
