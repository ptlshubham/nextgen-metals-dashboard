import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trade-payment',
  templateUrl: './trade-payment.component.html',
  styleUrls: ['./trade-payment.component.scss']
})
export class TradePaymentComponent implements OnInit {
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  openBilling: boolean = false;
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  buyerPaymentDetails: any = {};
  constructor() {
    this.openBilling = true;
  }

  ngOnInit(): void {
  }
  viewPaymentDetails() {

    this.buyerPaymentDetails
    this.openDetails = true;
    this.openBilling = false;
  }
  backToSummary() {
    this.openBilling = true;
    this.openDetails = false;
  }

}
