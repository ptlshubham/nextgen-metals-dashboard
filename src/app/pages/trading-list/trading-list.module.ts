import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TradeListRoutingModule } from './trade-list-routing';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { dataTableSortableDirective } from '../tables/datatable/datatable-sortable.directive';
import { TablesModule } from '../tables/tables.module';
import { CustomerTradeSummaryComponent } from './customer-trade-summary/customer-trade-summary.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CommissionListComponent } from './commission-list/commission-list.component';



@NgModule({
  declarations: [
    SellerListComponent,
    BuyerListComponent,
    CustomerListComponent,
    CustomerTradeSummaryComponent,
    CustomerDetailsComponent,
    CommissionListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    TradeListRoutingModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    TablesModule,
    DropzoneModule,
    CountToModule,
    NgbNavModule,
    FeatherModule.pick(allIcons),
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class TradingListModule { }
