import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-summary',
  templateUrl: './seller-trade-summary.component.html',
  styleUrls: ['./seller-trade-summary.component.scss']
})
export class SellerTradeSummaryComponent implements OnInit {
  sellerTrade: any = [];
  sellerModel: any = {};
  sellerDetails: any = {};
  isTradeOpen: boolean = false;
  paymentOpen: boolean = false;
  openDetails: boolean = false;
  constructor(
    private tradingService: TradeService
  ) { }

  ngOnInit(): void {
    this.isTradeOpen = true;
    this.tradingService.getAllTradingDatabyIdForSeller(localStorage.getItem('UserId')).subscribe((res: any) => {
      if (res.length == 0) {
        this.sellerTrade.length = 0;
      } else {
        this.sellerTrade = res;
        this.sellerTrade.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;

        })
      }

    })
  }
  acceptAndPay(data: any) {
    this.sellerModel = data;
    this.paymentOpen = true;
    this.isTradeOpen = false;
    this.openDetails = false;

  }
  backToSummary() {
    this.paymentOpen = false;
    this.isTradeOpen = true;
    this.openDetails = false;
  }
  viewTradeDetails(data: any) {
    this.sellerDetails = data
    this.paymentOpen = false;
    this.isTradeOpen = false;
    this.openDetails = true;
  }
}
