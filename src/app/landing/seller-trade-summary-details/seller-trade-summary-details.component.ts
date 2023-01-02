import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-summary-details',
  templateUrl: './seller-trade-summary-details.component.html',
  styleUrls: ['./seller-trade-summary-details.component.scss']
})
export class SellerTradeSummaryDetailsComponent implements OnInit {
  @Input() seller: any;
  sellerModel: any = {};
  transportModel: any = [];
  validationForm!: FormGroup;
  submitted = false;
  transportDetails: any = [];
  addTransporter: any = [];
  imageArray: any = [];
  invoiceImageArray: any = [];
  val: number = 0;

  @ViewChild('fileInput') el!: ElementRef;
  @ViewChild('fileInput1') el1!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  invoiceImageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  weightSlip: any;
  invoiceSlip: any;

  constructor(
    public formBuilder: FormBuilder,
    private tradingService: TradeService,
    private apiService:ApiService
  ) {

  }

  ngOnInit(): void {
    this.sellerModel = this.seller;
    this.sellerModel.buyerName = this.seller.BuyerFirstName+' '+this.seller.BuyerLastName;
    debugger
    this.addTransporter = [{ transportVehicle: '', transporterContact: "", materialQuantity: '', invoiceAmount: '', imageUrl: 'assets/images/file-upload-image.jpg', invoiceImageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId }];
    // if (this.sellerModel.transportDetailsStatus == true) {
      this.tradingService.getTransporterDetailsbyIdForSeller(this.sellerModel.SubOrderId).subscribe((res: any) => {
        this.transportDetails = res;
        debugger
      })
    // }
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      materialQuantity: [0, [Validators.required]],
      invoiceAmount: [0, [Validators.required]],
      contact: [0, [Validators.required, Validators.min(10)]],
    });
  }
  get f() { return this.validationForm.controls; }
  addTransporterList() {
    // this.val++;
    debugger
    this.addTransporter.push({ transportVehicle: '', transporterContact: "", materialQuantity: '', invoiceAmount: '', imageUrl: 'assets/images/file-upload-image.jpg', invoiceImageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId });
    debugger
  }
  removeTransporterList(val: any) {
    this.addTransporter.splice(val, 1);
  }
  submitTransportData() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.transportModel = [];
      this.addTransporter.forEach((element: any, index: any) => {
        this.transportModel.push({subOrderId:this.sellerModel.SubOrderId, transportVehicle: element.transportVehicle, transporterContact: element.transporterContact, materialQuantity: element.materialQuantity, invoiceAmount: element.invoiceAmount, tradeId: element.tradeId, deliveryStatus: 'Dispatched', transportImage: this.imageArray[index], invoiceImage: this.invoiceImageArray[index] })
      });
      this.transportModel
      debugger
      this.tradingService.saveTransporterDetails(this.transportModel).subscribe((res: any) => {
        if (res == 'success') {
          this.apiService.showNotification('top', 'right', 'Transport details added Successfully.', 'success');
          location.reload();
        }
      })

    }
  }
  uploadFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addTransporter[ind].imageUrl = reader.result;
        // this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.uploadWeightSlipImage(formdata).subscribe((response) => {
          this.weightSlip = response;
          this.imageArray[ind] = this.weightSlip;

          debugger
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }
  invoiceUploadFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addTransporter[ind].invoiceImageUrl = reader.result;
        // this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.inoviceRecieptImage(formdata).subscribe((response) => {
          this.invoiceSlip = response;
          this.invoiceImageArray[ind] = this.invoiceSlip;

          debugger
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }
}
