import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { HomeComponent } from './home/home.component';
import { SellerTradeComponent } from './seller-trade/seller-trade.component';
import { SubscripitionComponent } from './subscripition/subscripition.component';
import { TradeComponent } from './trade/trade.component';

const routes: Routes = [
    {
        path: 'subscripition',
        component: SubscripitionComponent
    },
    {
        path: 'user-home',
        component: HomeComponent
    },
    {
        path: 'complete-profile',
        component: CompleteProfileComponent
    },
    {
        path:'trade-active',
        component:TradeComponent
    },
    {
        path:'seller-trade-active',
        component:SellerTradeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LandingRoutingModule { }
