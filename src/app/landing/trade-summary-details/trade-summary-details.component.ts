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
  materialImage: any;
  deliveryDetails: any = [];
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
    })
  }
  onSubmit() {
    this.submitted = true;
    debugger
    if (this.validationForm.invalid) {
      return;
    } else {
      //  this.tradeModel.buyerId = localStorage.getItem('UserId');
      //  this.tradeModel.buyerName = localStorage.getItem('UserName');
      //  this.tradeModel.payment_validity = this.dt;
      //  this.tradeModel.payment_terms ;
      //  this.tradeModel.tradeStatus = 'IDEAL';
      //  this.tradeModel.payment_days = this.payment_days;
      //  debugger
      //  this.tradeService.newTraderequest(this.tradeModel).subscribe((res:any)=>{
      //   if(res == 'success'){

      //   }
      //  })

    }
  }
  uploadFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        // this.deliveryDetails[ind]
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.uploadrDeliveryRecieptImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }

  }
}
