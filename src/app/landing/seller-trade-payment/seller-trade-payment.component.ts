import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  sellerPaymentDetails: any = {};
  constructor() {
    this.openBilling = true;
  }

  ngOnInit(): void {
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
  viewPaymentDetails() {

    this.sellerPaymentDetails
    this.openDetails = true;
    this.openBilling = false;
  }
  backToSummary() {
    this.openBilling = true;
    this.openDetails = false;
  }

}
