import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-summary-details',
  templateUrl: './seller-trade-summary-details.component.html',
  styleUrls: ['./seller-trade-summary-details.component.scss']
})
export class SellerTradeSummaryDetailsComponent implements OnInit {
  @Input() seller: any;
  sellerModel: any = {};
  validationForm!: FormGroup;
  submitted = false;

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  constructor(
    public formBuilder: FormBuilder,
    private tradingService: TradeService

  ) { }

  ngOnInit(): void {
    this.sellerModel = this.seller;
    debugger
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      contact: [0, [Validators.required, Validators.min(10)]],
    });
  }
  get f() { return this.validationForm.controls; }

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
        this.tradingService.uploadWeightSlipImage(formdata).subscribe((response) => {
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
