import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'user-home',
        component: HomeComponent
    },
    {
        path: 'complete-profile',
        component: CompleteProfileComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LandingRoutingModule { }
