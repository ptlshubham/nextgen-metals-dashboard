import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerTrade } from 'src/app/core/models/seller-trade.model';
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

  sellerTrade: any = [
    { "id": 1, "oid": "001", 'sname': 'Xyz', "quality": 'Q1', "quantity": 50, "rate": 45000, "terms": 7, validity: 'Valid till 4 pm, 25th July' },
    { "id": 2, "oid": "002", 'sname': 'abc', "quality": 'Q1', "quantity": 40, "rate": 40000, "terms": 5, validity: 'Valid till 4 pm, 25th July' },
    { "id": 3, "oid": "003", 'sname': 'cdf', "quality": 'Q2', "quantity": 30, "rate": 4000, "terms": 6, validity: 'Valid till 4 pm, 25th July' },
    { "id": 4, "oid": "004", 'sname': 'fhg', "quality": 'Q3', "quantity": 20, "rate": 5000, "terms": 3, validity: 'Valid till 4 pm, 25th July' },
    { "id": 5, "oid": "005", 'sname': 'shu', "quality": 'Q1', "quantity": 10, "rate": 30000, "terms": 5, validity: 'Valid till 4 pm, 25th July' }

  ]
  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      validity: ['', Validators.required],
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

  }
  backToSummary() {
    this.isAccept = false;

  }

}
