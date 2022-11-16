import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentTradeService } from 'src/app/core/services/paymenttrade.service';

@Component({
  selector: 'app-trade-payment-details',
  templateUrl: './trade-payment-details.component.html',
  styleUrls: ['./trade-payment-details.component.scss']
})
export class TradePaymentDetailsComponent implements OnInit {
  @Input() PaymentDetails: any;
  buyerModel: any = {};

  validationForm!: FormGroup;
  submitted = false;
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  paymentSlip: any;

  constructor(
    public formBuilder: FormBuilder,
    private paymentTradeService:PaymentTradeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      utr: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.buyerModel.materialPaymentSlip = this.paymentSlip;
      debugger
      this.paymentTradeService.saveBuyerPaymentDetails(this.buyerModel).subscribe((res: any) => {
        if (res == 'success') {

        }
      })

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
        this.paymentTradeService.uploadPaymentSlipImage(formdata).subscribe((response) => {
          this.paymentSlip = response;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }

  openBankDetails(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, { windowClass: 'modal-holder' });
  }
}
