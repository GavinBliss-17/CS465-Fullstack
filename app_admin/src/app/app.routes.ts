import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { DeleteTripComponent } from './delete-trip/delete-trip.component'; // Import Delete Component

export const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent },
    { path: 'edit-trip', component: EditTripComponent },
    { path: 'login', component: LoginComponent },
    { path: 'trips', component: TripListingComponent, pathMatch: 'full' },
    { path: 'delete-trip', component: DeleteTripComponent }, // Add delete route
];
