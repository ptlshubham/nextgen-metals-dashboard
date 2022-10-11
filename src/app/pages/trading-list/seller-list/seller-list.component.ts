import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/models/customer.model';
import { dataTableSortableDirective, SortEvent } from '../../tables/datatable/datatable-sortable.directive';
import { DataTableService } from '../../tables/datatable/datatable.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
  providers: [DataTableService, DecimalPipe]

})
export class SellerListComponent implements OnInit {
  sellerTrade: any = [
    { "id": 1, "oid": "001", 'sname': 'Xyz', "quality": 'Q1', "quantity": 50, "rate": 45000, "terms": 7, validity: 'Valid till 4 pm, 25th July', location: 'Delhi Gurgaon' },
    { "id": 2, "oid": "002", 'sname': 'abc', "quality": 'Q1', "quantity": 40, "rate": 40000, "terms": 5, validity: 'Valid till 4 pm, 25th July', location: 'Delhi Gurgaon' },
    { "id": 3, "oid": "003", 'sname': 'cdf', "quality": 'Q2', "quantity": 30, "rate": 4000, "terms": 6, validity: 'Valid till 4 pm, 25th July', location: 'Delhi Gurgaon' },
    { "id": 4, "oid": "004", 'sname': 'fhg', "quality": 'Q3', "quantity": 20, "rate": 5000, "terms": 3, validity: 'Valid till 4 pm, 25th July', location: 'Delhi Gurgaon' },
    { "id": 5, "oid": "005", 'sname': 'shu', "quality": 'Q1', "quantity": 10, "rate": 30000, "terms": 5, validity: 'Valid till 4 pm, 25th July', location: 'Delhi Gurgaon' }

  ]
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Customer[];
  hideme: boolean[] = [];
  tables$: Observable<Customer[]>;
  total$: Observable<number>;
  constructor(
    public service: DataTableService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this._fetchData();
  }
  _fetchData() {
    this.tableData = this.tableData;
  }
  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column , direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
