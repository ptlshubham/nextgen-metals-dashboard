import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  openNewRequest: boolean = false;
  openTSummary: boolean = false;
  openPaymentSumm: boolean = false;
  role: any;
  allTradingListBuyer: any = [];
  newTradingListBuyer: any = [];
  weekTradeCountBuyer: number = 0;
  allTradingListSeller: any = [];
  newTradingListSeller: any = [];
  weekTradeCountSeller: number = 0;
  tradeSummaryCount: any = [];
  tradeSummaryLength: any = [];
  constructor(
    private router: Router,
    private tradingService: TradeService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('Role');
    if (this.role == 'buyer') {
      this.tradingService.getAllTradingDatabyIdForBuyer(localStorage.getItem('UserId')).subscribe((res: any) => {
          
        
        if (res.length == 0) {
          this.allTradingListBuyer.length = 0;
        } else {

          this.allTradingListBuyer = res;
          this.tradeSummaryCount = [];
          this.allTradingListBuyer.forEach((element: any) => {
            if (element.tradeStatus == 'ACCEPTED') {
                
              this.tradeSummaryCount.push(element);
            }
          });
          this.allTradingListBuyer.forEach((element: any) => {
            if (element.tradeStatus == 'IDEAL') {
              this.newTradingListBuyer.push(element);
            }
            let olddate = this.getLastWeeksDate().toISOString();
            if (element.createdDate >= olddate) {
              this.weekTradeCountBuyer++;
            }
          });
        }

      })
    } else {
      this.tradingService.getAllTradingDatabyIdForSeller(localStorage.getItem('UserId')).subscribe((res: any) => {
          
        this.tradeSummaryLength = [];
        res.forEach((element: any) => {
          if (element.tradeStatus == 'ACCEPTED') {
              
            this.tradeSummaryLength.push(element);
          }
        });
        if (res.length == 0) {
          this.allTradingListSeller.length = 0;
        } else {
          this.allTradingListSeller = res;
          this.tradeSummaryCount = [];
          this.allTradingListBuyer.forEach((element: any) => {
            if (element.tradeStatus == 'ACCEPTED') {
                
              this.tradeSummaryCount.push(element);
            }
          });
          this.allTradingListSeller.forEach((element: any) => {
            if (element.tradeStatus == 'IDEAL') {
              this.newTradingListSeller.push(element);
            }
            let olddate = this.getLastWeeksDate().toISOString();
            if (element.createdDate >= olddate) {
              this.weekTradeCountSeller++;
            }
          });
        }

      })
    }


  }
  getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  }

  openNewTrade() {
    this.openNewRequest = true;
    this.openTSummary = false;
    this.openPaymentSumm = false;
    if (localStorage.getItem('Role') == 'buyer') {
      this.router.navigate(['/landing/trade-active']);
    }
    else {
      this.router.navigate(['/landing/seller-trade-active']);
    }

  }
  openTradeSummary() {
    this.openTSummary = true;
    this.openNewRequest = false;
    this.openPaymentSumm = false;

  }
  openPaymentSummary() {
    this.openTSummary = false;
    this.openNewRequest = false;
    this.openPaymentSumm = true;
  }
  openHelpSupport() {
    this.router.navigate(['/pages/contact-us']);
  }
}
