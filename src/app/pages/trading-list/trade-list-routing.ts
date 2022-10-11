import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TradeListRoutingModule { }
