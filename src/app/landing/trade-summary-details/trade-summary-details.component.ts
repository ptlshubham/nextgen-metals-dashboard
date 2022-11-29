import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-trade-summary-details',
  templateUrl: './trade-summary-details.component.html',
  styleUrls: ['./trade-summary-details.component.scss']
})
export class TradeSummaryDetailsComponent implements OnInit {
  @Input() buyer: any;
  buyerModel: any = {};
  validationForm!: FormGroup;
  submitted = false;
  transportDetails: any = [];

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  deliveryReciept: any;
  deliveryDetails: any = [];
  recieptData: any = {};
  constructor(
    private tradingService: TradeService,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buyerModel = this.buyer;
    debugger
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
    });
    this.getTransporterDetails();
  }
  get f() { return this.validationForm.controls; }
  getTransporterDetails() {
    this.tradingService.getTransporterDetailsbyIdForSeller(this.buyerModel.tradeId).subscribe((res: any) => {
      this.transportDetails = res;
      debugger
      this.transportDetails.forEach((element: any) => {
        element.imageUrl = 'assets/images/file-upload-image.jpg';
      })
    })
  }
  saveDeliveryReciept(data: any) {
    this.submitted = true;
    debugger
    if (this.validationForm.invalid) {
      return;
    } else {
      this.recieptData.id = data.id, 
      this.recieptData.deliveryReciept = data.deliveryReciept, 
      this.recieptData.deliveryStatus = data.deliveryStatus;
      debugger
      this.tradingService.SaveDeliveryRecieptData(this.recieptData).subscribe((res: any) => {
        if (res == 'success') {

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
        // this.imageUrl = reader.result;
        this.transportDetails[ind].imageUrl = reader.result;
        // this.deliveryDetails[ind]
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.uploadDeliveryRecieptImage(formdata).subscribe((response) => {
          this.deliveryReciept = response;
          this.transportDetails[ind].deliveryReciept = this.deliveryReciept;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }

  }
}
