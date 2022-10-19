import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { ExtrapagesModule } from '../extrapages/extrapages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from '../layouts/layouts.module';
import { CountToModule } from 'angular-count-to';
import { SharedModule } from '../shared/shared.module';
import { TradeComponent } from './trade/trade.component';
import { TradeSummaryComponent } from './trade-summary/trade-summary.component';
import { TradePaymentComponent } from './trade-payment/trade-payment.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SellerTradeComponent } from './seller-trade/seller-trade.component';
import { SellerTradeSummaryComponent } from './seller-trade-summary/seller-trade-summary.component';
import { SellerTradePaymentComponent } from './seller-trade-payment/seller-trade-payment.component';
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ArchwizardModule } from 'angular-archwizard';
import { TradeSummaryDetailsComponent } from './trade-summary-details/trade-summary-details.component';
@NgModule({
  declarations: [
    HomeComponent,
    TradeComponent,
    TradeSummaryComponent,
    TradePaymentComponent,
    SellerTradeComponent,
    SellerTradeSummaryComponent,
    SellerTradePaymentComponent,
    CustomerPaymentComponent,
    CompleteProfileComponent,
    TradeSummaryDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule,
    ExtrapagesModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    DropzoneModule,
    CountToModule,
    FeatherModule.pick(allIcons),
    NgbPaginationModule,
    NgbTypeaheadModule,
    ArchwizardModule
  ],
  exports:[
    TradeComponent
  ]
})
export class LandingModule { }
