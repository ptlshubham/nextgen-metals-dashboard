import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.scss']
})
export class TradeSummaryComponent implements OnInit {
  buyerTrade: any = [ ];
  buyerData:any=[];
  openDetails: boolean = false;
  isBuyerOpen: boolean = false;
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
        this.buyerData.length=0;
       }else{
        this.buyerData = res;
        this.buyerData.forEach((element: any) => {
          if (element.tradeStatus === 'ACCEPTED' || element.tradeStatus==='REJECTED' )
            this.buyerTrade.push(element);
        })
        this.buyerData.forEach((element:any)=>{
          element.location = element.street+' '+element.city+' '+element.state;
          debugger
        })
       }
      
    })
  }
  backToSummary() {
    this.isBuyerOpen = true;
    this.openDetails = false;
  }

  viewTradeDetailsByTrade(data: any) {
    this.buyerDetails = data;
    debugger
    this.isBuyerOpen = false;
    this.openDetails = true;
  }
}
