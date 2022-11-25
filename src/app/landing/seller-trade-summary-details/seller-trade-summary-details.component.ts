import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  transportModel: any = [];
  validationForm!: FormGroup;
  submitted = false;
  transportDetails: any = [];
  addTransporter: any = [];
  imageArray: any = [];
  val: number = 0;

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  weightSlip: any;
  constructor(
    public formBuilder: FormBuilder,
    private tradingService: TradeService

  ) {

  }

  ngOnInit(): void {
    this.sellerModel = this.seller;
    this.addTransporter = [{ transportVehicle: '', transporterContact: "", weightProofImage: '', imageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId }]
    this.val++;
    debugger
    if (this.sellerModel.transportDetailsStatus == true) {
      this.tradingService.getTransporterDetailsbyIdForSeller(this.sellerModel.tradeId).subscribe((res: any) => {
        this.transportDetails = res;
        debugger
      })
    }
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      contact: [0, [Validators.required, Validators.min(10)]],
    });
  }
  get f() { return this.validationForm.controls; }
  addTransporterList() {
    this.val++;
    this.addTransporter.push({ transportVehicle: '', transporterContact: "", weightProofImage: '', imageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId });
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
      this.addTransporter.forEach((element: any,index:any) => {
        this.transportModel.push({ transportVehicle: element.transportVehicle, transporterContact: element.transporterContact, tradeId: element.tradeId ,transportImage:this.imageArray[index]})
      });
      this.tradingService.saveTransporterDetails(this.transportModel).subscribe((res: any) => {
        if (res == 'success') {
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

}
