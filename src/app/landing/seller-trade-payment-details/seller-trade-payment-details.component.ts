import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymentTradeService } from 'src/app/core/services/paymenttrade.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-seller-trade-payment-details',
  templateUrl: './seller-trade-payment-details.component.html',
  styleUrls: ['./seller-trade-payment-details.component.scss']
})
export class SellerTradePaymentDetailsComponent implements OnInit {
  @Input() PaymentDetails: any;
  sellerModel: any = {};

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  sellerBillingDetails:any={};
  constructor(
    public formBuilder: FormBuilder,
    private paymentTradeService: PaymentTradeService,
    private userService:UserProfileService
  ) { }

  ngOnInit(): void {
    this.sellerModel = this.PaymentDetails;
    this.userService.getUserDetail(this.sellerModel.BuyerId).subscribe((res:any)=>{
      this.sellerBillingDetails = res[0];
    })
    debugger
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
        this.paymentTradeService.uploadPaymentSlipImage(formdata).subscribe((response) => {
          this.materialImage = response;
          //   this.isImageSaved = true;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }
}
