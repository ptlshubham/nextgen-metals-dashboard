import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.openNewRequest = true;
    this.role = localStorage.getItem('Role');
    debugger
  }
  openNewTrade() {
    this.openNewRequest = true;
    this.openTSummary = false;
    this.openPaymentSumm = false;
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
