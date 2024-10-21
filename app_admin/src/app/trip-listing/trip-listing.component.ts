import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { trips } from '../data/trips';  // Use static data
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service'; // Import the service

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})

export class TripListingComponent implements OnInit {
  trips = trips;
  message: string = '';

  constructor(
    public router: Router, // Made public to allow usage in template
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService // Inject the service
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Method to delete a trip
  public deleteTrip(tripCode: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(tripCode).subscribe({
        next: () => {
          console.log(`Trip with code ${tripCode} deleted successfully`);
          // Remove the deleted trip from the local list
          this.trips = this.trips.filter(trip => trip.code !== tripCode);
          this.message = `Trip with code ${tripCode} deleted successfully.`;
        },
        error: (error) => {
          console.error('Error deleting trip:', error);
          this.message = `Error deleting trip with code ${tripCode}.`;
        }
      });
    }
  }

  ngOnInit(): void {
    this.message = `There are ${this.trips.length} trips available.`;
    console.log(this.message);
  }
}
