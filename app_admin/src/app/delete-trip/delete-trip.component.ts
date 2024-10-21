import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent {
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  // Method to delete trip by code
  deleteTrip(tripCode: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(tripCode).subscribe({
        next: () => {
          this.message = `Trip with code ${tripCode} deleted successfully.`;
          // Redirect back to trip listing
          this.router.navigate(['/trip-listing']);
        },
        error: (error) => {
          console.error('Error deleting trip:', error);
          this.message = `Error deleting trip with code ${tripCode}.`;
        }
      });
    }
  }
}
