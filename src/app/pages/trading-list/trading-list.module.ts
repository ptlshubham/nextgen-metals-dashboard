import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
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



@NgModule({
  declarations: [

    SellerListComponent,
    BuyerListComponent,
    CustomerListComponent,
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
    FeatherModule.pick(allIcons),
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class TradingListModule { }
