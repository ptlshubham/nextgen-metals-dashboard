import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TradeService } from 'src/app/core/services/trade.service';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  validationForm!: FormGroup;
  paymentOpen: boolean = false;
  submitted = false;
  selectedValue: any='Select Payment Terms';
  dt = new Date().toDateString();
  tradeModel:any={};
  payment_days:number=0;
  paymentTerms = [
    { id: 1, name: 'Advance Payment' },
    { id: 2, name: 'After Delivery' }

  ]
  constructor(
    public formBuilder: FormBuilder,
    public tradeService:TradeService
  ) {

  }

  ngOnInit(): void {
    this.dt;
    debugger
    this.tradeModel.payment_terms='Select Payment Terms';
    this.validationForm = this.formBuilder.group({
      selectMaterial:['', [Validators.required]],
      selectP:['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      terms:[],
      validity:[]
    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    }else{
       this.tradeModel.buyerId = localStorage.getItem('UserId');
       this.tradeModel.buyerName = localStorage.getItem('UserName');
       this.tradeModel.payment_validity = this.dt;
       this.tradeModel.payment_terms = this.selectedValue;
       this.tradeModel.tradeStatus = 'IDEAL';
       this.tradeModel.payment_days = this.payment_days;
       debugger
       this.tradeService.newTraderequest(this.tradeModel).subscribe((res:any)=>{
        if(res == 'success'){

        }
       })
      
    }
  }
  onPaymentChange(event: any) {
    this.selectedValue = event;
    if (this.selectedValue == 'After Delivery')
    {
      this.paymentOpen = true;
      this.tradeModel.payment_terms='After Delivery';
      
    }
    else{
      this.paymentOpen = false;
      this.tradeModel.payment_terms='Advance Payment';
    }
  }

}
