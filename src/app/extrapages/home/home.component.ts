import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showNavigationIndicators: any;
  breadCrumbItems!: Array<{}>;
  public Collapsed = false;
  public firstCollapse = false;
  public secondCollapse = false;
  public bothColleaps = false;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Components' },
      { label: 'Tabs & Accordions', active: true }
    ];
  }

}
