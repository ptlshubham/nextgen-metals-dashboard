import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from '../layouts/layouts.module';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HeaderRightComponent } from './header-right/header-right.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    ComingsoonComponent,
    Page404Component,
    Page500Component,
    HomeComponent,
    FaqComponent,
    ContactComponent,
    HeaderComponent,
    HeaderMainComponent,
    HeaderRightComponent,
    FooterMainComponent,
    UserRegisterComponent,
    AboutComponent,
    ProfileComponent,
    PrivacyPolicyComponent,
    ProductSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ExtrapagesRoutingModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    ArchwizardModule,
    FeatherModule.pick(allIcons),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ],
  exports:[
    HeaderComponent,
    HeaderMainComponent,
    HeaderRightComponent,
    FooterMainComponent
  ]
})
export class ExtrapagesModule { }
