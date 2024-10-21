import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  // Updated constructor to pull the authentication service into the class
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  // Delegate isLoggedIn() to the authentication service
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip) {
    if (this.isLoggedIn()) {  // Only allow edit if logged in
      localStorage.removeItem("tripCode");
      localStorage.setItem("tripCode", trip.code);
      this.router.navigate(['edit-trip']);
    } else {
      console.log('Not logged in - cannot edit');
    }
  }

  public deleteTrip(trip: Trip): void {
    console.log('Inside trip-card Component #DeleteTrip');
    localStorage.setItem("tripCode", trip.code);
    // this.router.navigate(['']);
    this.router.navigate(['delete-trip']);
  }

}