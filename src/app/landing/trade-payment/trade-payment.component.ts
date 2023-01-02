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
  TransportList:any=[];

  constructor(
    private tradingService: TradeService
  ) {
    this.openBilling = true;
  }

  ngOnInit(): void {
    debugger
    this.tradingService.getBillTradingDataForBuyer(localStorage.getItem('UserId')).subscribe((res: any) => {
      debugger
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerTrade=[];
        this.buyerData = res;
        this.buyerTrade = res;
      }
    })
  }

  
  viewTransportDetails(data: any) {
    this.transportDetails = data.TrasnportDetail;
    // this.tradingService.getTransporterDetailsbyIdForSeller(data).subscribe((res: any) => {
    //   this.transportDetails = res;
    //   debugger
    // })
    this.openDetails = false;
    this.openBilling = false;
    this.openDelivery = true;

  }
  viewPaymentDetails(data: any,ind:any) {
    debugger
   this.transport = [];
    this.transport.push({ OrderId: data.OrderId, SellerId: data.SellerId, 
      SellerName: data.SellerName, 
      SellerLocation: data.location, 
      BuyerQuality: this.buyerData[ind].BuyerQuality, 
      SellerQuantity: data.SellerQuantity,
      Rate: data.BuyerRate, 
      TransportId: data.TransportId, 
      Dispachdate: data.StartDate,
      DilveredDate: data.EndDate, 
      DriverContact: data.DriverContact, 
      VehicleNo: data.VehicleNo, 
      WeightSlip: data.WeightSlip, 
      InvoiceImage: data.InvoiceImage, 
      MaterialQuantity: data.MaterialQuantity, 
      InvoiceAmount: data.InvoiceAmount,
      DeliveryStatus: data.DeliveryStatus, 
      DeliveryReceipt: data.DeliveryReceipt, 
      UtrNo: data.UtrNo,
      PaymentImage: data.PaymentImage, 
      PaymentDate: data.PaymentDate,
      DueDate: data.DueDate });
    this.buyerPaymentDetails = this.transport[0];
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
