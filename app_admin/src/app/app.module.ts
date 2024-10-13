import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';



@NgModule({
  declarations: [
    TripListingComponent,
    TripCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
