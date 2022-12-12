import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { circle, latLng, tileLayer } from 'leaflet';

import { walletOverview, investedOverview, marketOverview, walletlineChart, tradeslineChart, investedlineChart, profitlineChart, recentActivity, News, transactionsAll, transactionsBuy, transactionsSell } from './data';
import { ChartType } from './dashboard.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  buyerList : any=[];
  sellerList : any=[];
  pendingKycUserList : any=[];
  title!: string;
  dataSource!: Object;
  walletOverview!: ChartType;
  investedOverview!: ChartType;
  marketOverview!: ChartType;
  walletlineChart!: ChartType;
  tradeslineChart!: ChartType;
  investedlineChart!: ChartType;
  profitlineChart!: ChartType;
  recentActivity: any;
  News: any;
  transactionsAll: any;
  transactionsBuy: any;
  transactionsSell: any;

  // Coin News Slider
  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 4
      },
    }
  }

  constructor(
    private dashboardService : DashboardService,
    private router:Router
  ) {
  }

  /**
   * Sale Location Map
   */
  options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];

  ngOnInit(): void {

    this.getBuyer();
    this.getSeller();
    this.getPendingKycUser();
    // this.getBuyer();
    /**
     * BreadCrumb 
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  getBuyer(){
    this.dashboardService.getBuyerList().subscribe((res:any)=>{
      this.buyerList = res;
    })
  }
  getSeller(){
    this.dashboardService.getSellerList().subscribe((res:any)=>{
      this.sellerList = res;
    })
  }
  getPendingKycUser(){
    this.dashboardService.getKycPendingList().subscribe((res:any)=>{
      this.pendingKycUserList = res;
      debugger
    })
  }


  /**
   * Fetches the data
   */
  private fetchData() {
    this.walletOverview = walletOverview;
    this.investedOverview = investedOverview;
    this.marketOverview = marketOverview;
    this.walletlineChart = walletlineChart;
    this.tradeslineChart = tradeslineChart;
    this.investedlineChart = investedlineChart;
    this.profitlineChart = profitlineChart;
    this.recentActivity = recentActivity;
    this.News = News;
    this.transactionsAll = transactionsAll;
    this.transactionsBuy = transactionsBuy;
    this.transactionsSell = transactionsSell;
  }

  openUserList(val:any){
    if(val =='pendingKyc'){
      this.router.navigate(['trade-list/customer'],{
        queryParams:{
          type:'pendingKyc'
        }
      });
    }else if(val == 'buyer'){
      this.router.navigate(['trade-list/customer'],{
        queryParams:{
          type:'buyer'
        }
      });
    }else{
      this.router.navigate(['trade-list/customer'],{
        queryParams:{
          type:'seller'
        }
      });
    }
   
  }
  

}
