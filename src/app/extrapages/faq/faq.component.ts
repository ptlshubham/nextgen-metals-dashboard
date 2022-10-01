import { Component, OnInit } from '@angular/core';
import { faqsModel } from 'src/app/pages/extraspages/faqs/faqs.model';
import { FaqData } from './faqdata';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  FaqData!: faqsModel[];
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb Set
    */
    this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'FAQs', active: true }
    ];

    // Pricing Data Get Function
    this._fetchData();
  }

  // Pricing Data Fetch
  private _fetchData() {
    this.FaqData = FaqData;
  }
}