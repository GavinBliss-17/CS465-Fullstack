import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { TripDataService } from '../services/trip-data.service';
import { trips } from '../data/trips';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {
  // Initialize trips array and message variable
  trips: Array<any> = trips;
  // trips!: Trip[];
  message: string = '';
  
  constructor(
    private tripDataService: TripDataService,
    private router: Router
    ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Method to get trips from TripDataService
  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // Call getStuff method when component initializes
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}