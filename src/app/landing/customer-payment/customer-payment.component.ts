import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.scss']
})
export class CustomerPaymentComponent implements OnInit {
  @Input() buyer: any;
  comRate: number = 50;
  comTotal: number = 0;
  withoutTax: number = 0;
  tax: number = 19;
  GSTAmount: number = 0;
  TDSAmount: number = 0;
  GST: number = 18;
  TDS: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.comTotal = this.comRate * this.buyer.quantity;
    this.withoutTax = +this.comTotal - (+this.comTotal * +this.tax / 100);
    this.GSTAmount = (+this.comTotal * +this.GST / 100);
    this.TDSAmount = (+this.comTotal * +this.TDS / 100);

    // this.restock.discountPrice = +this.restock.productPrice - (+this.restock.productPrice * +this.restock.productPer / 100);

  }

}
