import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.scss']
})
export class TradeSummaryComponent implements OnInit {
  byuerTrade: any = [ ];
  isAccept: boolean = false;
  openDetails: boolean = false;
  isBuyerOpen: boolean = false;
  openPayment: boolean = false;
  buyerModel: any = {};
  buyerDetails: any = {};
  constructor(
    public tradingService:TradeService
  ) {
    this.isBuyerOpen = true;
  }

  ngOnInit(): void {
    this.tradingService.getAllTradingDatabyIdForBuyer(localStorage.getItem('UserId')).subscribe((res:any)=>{
      debugger
       if(res.length ==0){
        this.byuerTrade.length=0;
       }else{
        this.byuerTrade = res;
        this.byuerTrade.forEach((element:any)=>{
          element.location = element.street+' '+element.city+' '+element.state;
          debugger
        })
       }
      
    })
  }

  viewAcceptOrReject(data: any) {
    this.buyerModel = data;
    this.isAccept = true;
    this.isBuyerOpen = false;
    this.openPayment = false
    this.openDetails = false;
  }
  backToSummary() {
    this.isAccept = false;
    this.isBuyerOpen = true;
    this.openPayment = false;
    this.openDetails = false;
  }
  acceptOrderAndPay() {
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = true;
    this.openDetails = false;
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
  viewTradeDetailsByTrade(data: any) {
    this.buyerDetails = data;
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = false;
    this.openDetails = true;
  }
}
