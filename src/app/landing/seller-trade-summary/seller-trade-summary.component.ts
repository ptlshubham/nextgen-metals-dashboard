import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-summary',
  templateUrl: './seller-trade-summary.component.html',
  styleUrls: ['./seller-trade-summary.component.scss']
})
export class SellerTradeSummaryComponent implements OnInit {
  sellerTrade: any = [
    // { id: 1, oid: 'A02501', 'sname': 'Xyz', quality: 'Q1', quantity: 50, rate: 45000, terms: 7, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'IDEAL', tradeDate: '11-10-2020', dispacthDate: '11-10-2020' },
    // { id: 2, oid: 'A02502', 'sname': 'abc', quality: 'Q1', quantity: 40, rate: 40000, terms: 5, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'ACCEPTED', tradeDate: '09-10-2022', dispacthDate: '09-10-2022' },
    // { id: 3, oid: 'A02503', 'sname': 'cdf', quality: 'Q2', quantity: 30, rate: 4000, terms: 6, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'PENDING', tradeDate: '06-05-2022', dispacthDate: '06-05-2022' },
    // { id: 4, oid: 'A02504', 'sname': 'fhg', quality: 'Q3', quantity: 20, rate: 5000, terms: 3, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'REJECTED', tradeDate: '08-05-2021', dispacthDate: '08-05-2021' },
    // { id: 5, oid: 'A02505', 'sname': 'shu', quality: 'Q1', quantity: 10, rate: 30000, terms: 5, validity: 'Valid till 4 pm, 25th July', image: 'assets/images/users/avatar-5.jpg', location: 'Delhi Gurgaon', status: 'PENDING', tradeDate: '06-05-2022', dispacthDate: '06-05-2022' }

  ]
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
        debugger
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
