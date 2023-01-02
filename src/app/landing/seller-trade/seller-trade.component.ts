import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerTrade } from 'src/app/core/models/seller-trade.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SellerTradeService } from 'src/app/core/services/seller-trade.service';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade',
  templateUrl: './seller-trade.component.html',
  styleUrls: ['./seller-trade.component.scss']
})
export class SellerTradeComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;
  isAccept: boolean = false;
  isPending: boolean = false;
  isActiveOpen: boolean = false;
  isOpenDetails: boolean = false;
  sellerModel: any = {};

  public tradeModel: SellerTrade = new SellerTrade;

  @ViewChild('fileInput') el!: ElementRef;
  @ViewChild('multiFileInput') el1!: ElementRef;

  imageUrl: any = "assets/images/file-upload-image.jpg";
  multiImageUrl: any = "assets/images/file-upload-image.jpg";

  editFile: boolean = true;
  removeUpload: boolean = false;
  subActiveList: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  materialMultiImage: any = [];

  addMultiImg: any = [];
  val: number = 0;

  sellerTrade: any = [];
  sellerData: any = [];
  sellerActiveData: any = [];
  sellerTradeActive: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public sellerTradeService: SellerTradeService,
    public tradingService: TradeService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.isPending = true;

  }

  ngOnInit(): void {
    this.val++;
    this.tradingService.newTradeReqForSeller().subscribe((res: any) => {
      this.sellerData = res;
      this.sellerTrade = [];
      this.sellerData.forEach((element: any) => {
        element.buyerLocation = element.street + ' ' + element.city + ' ' + element.state;
        this.sellerTrade.push(element);
      })
      this.getActiveRequestData();
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
      payment_days: ['']
    });
  }
  get f() { return this.validationForm.controls; }

  addServiceList() {
    this.val++;
    this.addMultiImg.push({ name: this.val, multiImageUrl: 'assets/images/file-upload-image.jpg' });
  }
  removeServiceList(val: any) {
    this.addMultiImg.splice(val, 1);
  }

  acceptBuyerRequest() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.validationForm.invalid) {
      return;
    } else {
      let seller: any, name: any;
      seller = localStorage.getItem('UserId');
      name = localStorage.getItem('UserName');
      this.tradeModel.materialImage = this.materialImage;
      this.tradeModel.sellerId = seller;
      this.tradeModel.sellerName = name;
      this.tradeModel.materialMultiImage = this.materialMultiImage;
      this.tradingService.saveSellerTradeRequest(this.tradeModel).subscribe((res: any) => {
        if (res == 'success') {
          this.apiService.showNotification('top', 'right', 'Trade details added Successfully.', 'success');
          this.isAccept=false;
          this.isPending=true;
          this.ngOnInit();
        }
      })
    }
  }
  getActiveRequestData() {
    this.sellerTradeActive = [];
    this.tradingService.getAllTradingDatabyIdForSeller(localStorage.getItem('UserId')).subscribe((res: any) => {
      debugger
      if (res.length == 0) {
        this.sellerActiveData.length = 0;
      } else {
        this.sellerActiveData = res;
        debugger
        this.sellerActiveData.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })
        this.sellerActiveData.forEach((element: any) => {
          if (element.TradeStatus == 'PENDING')
            this.sellerTradeActive.push(element);
        })
      }

    })
  }
  editAcceptOrder(val: any) {
    this.isAccept = true;
    this.isPending = false;
    this.isOpenDetails = false;
    this.isActiveOpen = false;

    this.tradeModel = val;
    this.materialMultiImage = [];
    this.addMultiImg = [];
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
    this.isActiveOpen = false;
    this.isPending = true;
    this.isOpenDetails = false;
  }
  backToActive() {
    this.isAccept = false;
    this.isActiveOpen = true;
    this.isPending = false;
    this.isOpenDetails = false;
  }
  openPendingRequest() {
    this.isAccept = false;
    this.isPending = true;
    this.isActiveOpen = false;
    this.isOpenDetails = false;

  }
  openActiveRequestList() {
    this.isActiveOpen = true;
    this.isAccept = false;
    this.isPending = false;
    this.isOpenDetails = false;

  }
  viewActiveDetails(data: any) {
    this.subActiveList = true;
    this.sellerModel = data;
    this.sellerModel.buyname = this.sellerModel.BuyerFirstName + ' ' + this.sellerModel.BuyerLastName;
    debugger
    this.isAccept = false;
    this.isPending = false;
    this.isActiveOpen = false;
    this.isOpenDetails = true;
  }
  backToDashboard() {
    this.router.navigate(['/landing/user-home']);
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
  uploadMultiFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addMultiImg[ind].multiImageUrl = reader.result;
        // this.multiImageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);


        this.sellerTradeService.uploadMaterialMultiImage(formdata).subscribe((response) => {
          this.materialMultiImage.push(response);

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

