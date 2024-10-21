import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing.component';  // Standalone component
import { TripCardComponent } from './trip-card/trip-card.component';  // Standalone component

@NgModule({
  imports: [
    CommonModule,
    TripListingComponent,  // Import the standalone component
    TripCardComponent      // Import the standalone component
  ]
})
export class AppModule { }
