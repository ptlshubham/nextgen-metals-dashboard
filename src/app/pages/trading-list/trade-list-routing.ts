import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { CommissionListComponent } from './commission-list/commission-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerTradeSummaryComponent } from './customer-trade-summary/customer-trade-summary.component';
import { SellerListComponent } from './seller-list/seller-list.component';


const routes: Routes = [
    {
        path: 'buyer',
        component: BuyerListComponent
    },
    {
        path: 'seller',
        component: SellerListComponent
    },
    {
        path: 'customer',
        component: CustomerListComponent
    },
    {
        path: 'trade',
        component: CustomerTradeSummaryComponent
    },
    {
        path: 'commission',
        component: CommissionListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TradeListRoutingModule { }
