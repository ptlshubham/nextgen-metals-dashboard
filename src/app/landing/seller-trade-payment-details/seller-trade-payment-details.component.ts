import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymentTradeService } from 'src/app/core/services/paymenttrade.service';

@Component({
  selector: 'app-seller-trade-payment-details',
  templateUrl: './seller-trade-payment-details.component.html',
  styleUrls: ['./seller-trade-payment-details.component.scss']
})
export class SellerTradePaymentDetailsComponent implements OnInit {
  @Input() PaymentDetails: any;
  sellerModel: any = {};

  constructor(
    public formBuilder: FormBuilder,
    private paymentTradeService:PaymentTradeService
  ) { }

  ngOnInit(): void {
   
  }
 
}
