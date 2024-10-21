import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  baseUrl = 'http://localhost:3000/api'; // base URL for API
  tripsUrl = `${this.baseUrl}/trips`;     // specific endpoint for trips

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to process both login and register methods
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  // Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  // Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData);
  }

  // Retrieve a specific trip by tripCode
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsUrl}/${tripCode}`);
  }

  // Update an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData);
  }

  // Delete a trip by tripCode
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(`${this.tripsUrl}/${tripCode}`);
  }
}