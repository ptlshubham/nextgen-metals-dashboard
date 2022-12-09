import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';

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
  openDelivery: boolean = false;
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  buyerPaymentDetails: any = {};
  buyerData: any = [];
  buyerTrade: any = [];
  transportDetails: any = [];
  transport: any = [];

  constructor(
    private tradingService: TradeService
  ) {
    this.openBilling = true;
  }

  ngOnInit(): void {
    this.tradingService.getAllTradingDatabyIdForBuyer(localStorage.getItem('UserId')).subscribe((res: any) => {
      debugger
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerData = res;
        this.buyerData.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })
        this.buyerData.forEach((element: any) => {
          if (element.transportDetailsStatus == true)
            this.buyerTrade.push(element);
          debugger
        })
      }
    })
  }
  viewTransportDetails(data: any) {
    this.tradingService.getTransporterDetailsbyIdForSeller(data).subscribe((res: any) => {
      this.transportDetails = res;
      debugger
    })
    this.openDetails = false;
    this.openBilling = false;
    this.openDelivery = true;

  }
  viewPaymentDetails(data: any) {

    this.transport = [];
    this.buyerData.forEach((element: any) => {
      if (element.tradeId == data.orderId)
        this.transport.push({ tradeId: element.tradeId, sellerId: element.sellerId, sellerName: element.sellerName, sellerLocation: element.location, quality: element.req_quality, quantity: element.sellerQuantity, rate: element.buyerRate, transportId: data.id, dispachdate: data.startDate, dilveredDate: data.endDate, driverContact: data.driverContact, vehicleNo: data.vehicleNo, weightSlip: data.weightSlip, invoiceImage: data.invoiceImage, materialQuantity: data.materialQuantity, invoiceAmount: data.invoiceAmount, deliveryStatus: data.deliveryStatus, deliveryReciept: data.deliveryReciept, utrNo: data.utrNo, paymentImage: data.paymentImage, paymentDate: data.paymentDate, dueDate: data.dueDate });
    })
    this.buyerPaymentDetails = this.transport[0]
    debugger

    this.openDetails = true;
    this.openBilling = false;
    this.openDelivery = false;

  }
  backToSummary() {
    this.openBilling = false;
    this.openDetails = false;
    this.openDelivery = true;

  }
  backToBilling() {
    this.openBilling = true;
    this.openDetails = false;
    this.openDelivery = false;

  }
}
