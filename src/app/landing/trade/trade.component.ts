import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  validationForm!: FormGroup;
  paymentOpen: boolean = false;
  openNewRequest: boolean = false;
  openActive: boolean = false;
  isAccept: boolean = false;
  isBuyerOpen: boolean = false;
  openPayment: boolean = false;
  isViewDetails: boolean = false;

  submitted = false;
  buyerTrade: any = [];
  buyerData: any = [];
  buyerModel: any = {};
  dt = new Date().toDateString();
  tradeModel: any = {};
  payment_days: number = 0;
  paymentTerms = [
    { id: 1, name: 'Advance Payment' },
    { id: 2, name: 'After Delivery' }

  ]
  constructor(
    public formBuilder: FormBuilder,
    public tradeService: TradeService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getRequestList();
    this.dt;
    debugger
    // this.tradeModel.payment_terms='Select Payment Terms';
    this.validationForm = this.formBuilder.group({
      selectMaterial: ['', [Validators.required]],
      selectPayment: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      terms: [[Validators.required]],
      validity: []
    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;
    debugger
    if (this.validationForm.invalid) {
      return;
    } else {
      this.tradeModel.buyerId = localStorage.getItem('UserId');
      this.tradeModel.buyerName = localStorage.getItem('UserName');
      this.tradeModel.payment_validity = this.dt;
      this.tradeModel.payment_terms;
      this.tradeModel.tradeStatus = 'IDEAL';
      this.tradeModel.payment_days = this.payment_days;
      debugger
      this.tradeService.newTraderequest(this.tradeModel).subscribe((res: any) => {
        if (res == 'success') {
          this.getRequestList();
        }
      })

    }
  }
  openActiveRequest() {
    this.openActive = true;
    this.openNewRequest = true;
    this.isBuyerOpen = true;
    this.isAccept = false;
    this.openPayment = false
    this.isViewDetails = false;
  }

  newTradeRequest() {
    this.openActive = false;
    this.openNewRequest = false;
    this.isBuyerOpen = false;
    this.isAccept = false;
    this.openPayment = false
    this.isViewDetails = false;
  }
  backToDashboard() {
    this.router.navigate(['/landing/user-home']);
  }
  getRequestList() {
    this.tradeService.getAllTradingDatabyIdForBuyer(localStorage.getItem('UserId')).subscribe((res: any) => {
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerData = res;
        this.buyerTrade = [];
        this.buyerData.forEach((element: any) => {
          if (element.tradeStatus === 'IDEAL' || element.tradeStatus==='PENDING' )
            this.buyerTrade.push(element);
        })
        this.buyerData.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })
      }

    })
  }
  viewAcceptOrReject(data: any) {
    this.buyerModel = data;
    debugger
    this.isAccept = true;
    this.isBuyerOpen = false;
    this.openPayment = false
    this.isViewDetails = false;
  }
  backToSummary() {
    this.isAccept = false;
    this.isBuyerOpen = true;
    this.openPayment = false;
    this.isViewDetails = false;

  }
  acceptOrderAndPay() {
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = true;
    this.isViewDetails = false;

  }
  recjectTrade() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to reject a trade!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes!'
    }).then(result => {
      if (result.value) {
        // this.deleteMail();
        Swal.fire('Successfully!', 'Reject trade has been Completed.', 'success');
      }
    });
  }
  backToViewReject() {
    this.isAccept = true;
    this.isBuyerOpen = false;
    this.openPayment = false;
    this.isViewDetails = false;

  }
  viewTradeDetailsByTrade(data: any) {
    this.buyerModel = {};
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = false;
    this.isViewDetails = true;
    this.buyerModel = data;
  }
}
