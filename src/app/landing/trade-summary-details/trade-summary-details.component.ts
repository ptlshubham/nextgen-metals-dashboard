import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-summary-details',
  templateUrl: './trade-summary-details.component.html',
  styleUrls: ['./trade-summary-details.component.scss']
})
export class TradeSummaryDetailsComponent implements OnInit {
  @Input() buyer: any;
  buyerModel: any = {};
  constructor() { }

  ngOnInit(): void {
    this.buyerModel = this.buyer;
    debugger
    
  }

}
