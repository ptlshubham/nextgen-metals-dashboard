import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerTrade } from 'src/app/core/models/seller-trade.model';
import { SellerTradeService } from 'src/app/core/services/seller-trade.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-seller-trade',
  templateUrl: './seller-trade.component.html',
  styleUrls: ['./seller-trade.component.scss']
})
export class SellerTradeComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;
  isAccept: boolean = false;

  public tradeModel: SellerTrade = new SellerTrade;

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;

  sellerTrade: any = []
  constructor(
    public formBuilder: FormBuilder,
    public sellerTradeService: SellerTradeService,
    public tradingService:TradeService
  ) { }

  ngOnInit(): void {
    debugger
    this.tradingService.newTradeReqForSeller().subscribe((res:any)=>{
      this.sellerTrade = res;
      debugger
    })
    this.validationForm = this.formBuilder.group({
      validity: ['', Validators.required],
      address: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      sellquantity: [0, [Validators.required, Validators.min(1)]],
      terms: [0, [Validators.required, Validators.min(1)]],
      diliveryterms: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      quality: ['', [Validators.required]],
      buyer: ['', [Validators.required]],
      payment_days:['']
    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    debugger
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.validationForm.invalid) {
      debugger
      return;
    }else{
      let seller:any,name:any;
      seller = localStorage.getItem('UserId');
      name = localStorage.getItem('UserName');
      this.tradeModel.materialImage = this.materialImage;
      this.tradeModel.sellerId =seller;
      this.tradeModel.sellerName=name;
      this.tradingService.saveSellerTradeRequest(this.tradeModel).subscribe((res:any)=>{
        if(res =='success'){
          alert('submitted request');
        }
      })

      debugger
    }
  }
  editAcceptOrder(val: any) {
    this.isAccept = true;
    this.tradeModel = val;
    this.validationForm.controls['quantity'].disable();
    this.validationForm.controls['quality'].disable();
    this.validationForm.controls['terms'].disable();
    this.validationForm.controls['rate'].disable();
    this.validationForm.controls['validity'].disable();
    this.validationForm.controls['buyer'].disable();
    this.validationForm.controls['address'].disable();
    this.validationForm.controls['payment_days'].disable();


  }
  backToSummary() {
    this.isAccept = false;

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
        

        this.sellerTradeService.uploadMaterialImage(formdata).subscribe((response) => {
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

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;

  }

}

