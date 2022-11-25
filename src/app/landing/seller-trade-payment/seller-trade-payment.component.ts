import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-payment',
  templateUrl: './seller-trade-payment.component.html',
  styleUrls: ['./seller-trade-payment.component.scss']
})
export class SellerTradePaymentComponent implements OnInit {
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  openBilling: boolean = false;
  openTransport: boolean = false;
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  sellerPaymentDetails: any = {};
  sellerData: any = [];
  sellerTrade: any = [];
  transportDetails: any = [];
  transport: any = [];

  constructor(
    private tradingService: TradeService
  ) {
    this.openBilling = true;
  }

  ngOnInit(): void {
    this.tradingService.getAllTradingDatabyIdForSeller(localStorage.getItem('UserId')).subscribe((res: any) => {
      debugger
      if (res.length == 0) {
        this.sellerData.length = 0;
      } else {
        this.sellerData = res;
        this.sellerData.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })
        this.sellerData.forEach((element: any) => {
          if (element.transportDetailsStatus == true)
            this.sellerTrade.push(element);

        })
      }
    })
  }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);


        // this.sellerTradeService.uploadMaterialImage(formdata).subscribe((response) => {
        //   this.materialImage = response;
        //   this.editFile = false;
        //   this.removeUpload = true;
        // })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;

  }
  viewTransportDetails(data: any) {
    this.tradingService.getTransporterDetailsbyIdForSeller(data).subscribe((res: any) => {
      this.transportDetails = res;
      debugger
    })
    this.openDetails = false;
    this.openBilling = false;
    this.openTransport = true;

  }
  viewPaymentDetails(data: any) {
    this.transport = [];
    this.sellerData.forEach((element: any) => {
      if (element.tradeId == data.orderId)
        this.transport.push({ tradeId: element.tradeId, buyerName: element.buyerName, buyerLocation: element.location, quality: element.req_quality, quantity: element.sellerQuantity, rate: element.buyerRate, invoiceAmount: element.invoiceAmount, dispachdate: data.startDate, dilveredDate: data.endDate, driverContact: data.driverContact, vehicleNo: data.vehicleNo, weightSlip: data.weightSlip });
    })
    this.sellerPaymentDetails = this.transport[0]
    debugger
    this.openDetails = true;
    this.openBilling = false;
    this.openTransport = false;

  }
  backToSummary() {
    this.openBilling = false;
    this.openDetails = false;
    this.openTransport = true;

  }
  backToBilling() {
    this.openBilling = true;
    this.openDetails = false;
    this.openTransport = false;

  }

}
