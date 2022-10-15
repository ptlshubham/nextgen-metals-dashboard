import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerTrade } from 'src/app/core/models/seller-trade.model';
import { SellerTradeService } from 'src/app/core/services/seller-trade.service';
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
  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  sellerTrade: any = [
    { "id": 1, "oid": "001", 'sname': 'Xyz', "quality": 'Q1', "quantity": 50, "rate": 45000, "terms": 7, validity: 'Valid till 4 pm, 25th July', "address": 'Delhi Gurgaon' },
    { "id": 2, "oid": "002", 'sname': 'abc', "quality": 'Q1', "quantity": 40, "rate": 40000, "terms": 5, validity: 'Valid till 4 pm, 25th July', "address": 'Delhi Gurgaon' },
    { "id": 3, "oid": "003", 'sname': 'cdf', "quality": 'Q2', "quantity": 30, "rate": 4000, "terms": 6, validity: 'Valid till 4 pm, 25th July', "address": 'Delhi Gurgaon' },
    { "id": 4, "oid": "004", 'sname': 'fhg', "quality": 'Q3', "quantity": 20, "rate": 5000, "terms": 3, validity: 'Valid till 4 pm, 25th July', "address": 'Delhi Gurgaon' },
    { "id": 5, "oid": "005", 'sname': 'shu', "quality": 'Q1', "quantity": 10, "rate": 30000, "terms": 5, validity: 'Valid till 4 pm, 25th July', "address": 'Delhi Gurgaon' }

  ]
  constructor(
    public formBuilder: FormBuilder,
    public sellerTradeService: SellerTradeService
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      validity: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      sellquantity: [0, [Validators.required, Validators.min(1)]],
      terms: [0, [Validators.required, Validators.min(1)]],
      diliveryterms: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      password: ['', Validators.required], confirmpwd: ['', Validators.required],
      select: ['', [Validators.required]],
      quality: ['', [Validators.required]],
      buyer: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmpwd'),

    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validationForm.invalid) {
      return;
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
        debugger

        this.sellerTradeService.uploadMaterialImage(formdata).subscribe((response) => {
          this.materialImage = response;
          debugger
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

