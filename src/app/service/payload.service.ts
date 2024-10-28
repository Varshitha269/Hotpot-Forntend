import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  private storedUserPayload: string | null = localStorage.getItem('userPayload');
  private payload: any;

  // BehaviorSubject to track the user name
  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();

  // BehaviorSubject to track the user role
  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  // Method to retrieve the entire user payload from localStorage
  private getUserPayload(): any {
    if (this.storedUserPayload) {
      console.log('Retrieved user payload:', JSON.parse(this.storedUserPayload));  // Log the payload
      return JSON.parse(this.storedUserPayload);
    }
    console.log('No user payload found in local storage.');
    return null;
  }

  // Method to get the user ID from the payload
  public getUserId(): string {
    const userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.nameid;

    }
    return "";
    
  }

  // Method to get the user name from the payload
  public getUserName(): string | null {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      console.log('User Name:', userPayload.unique_name);  // Log the user name
      return userPayload.unique_name;
    }
    return null;
  }

  // Extract restaurant name from the user name
  public extractRestaurantName(): string | null {
    const userName = this.getUserName();
    console.log('Extracting restaurant name from userName:', userName);  // Log the userName
    if (userName) {
      const parts = userName.split('@');
      if (parts.length > 1) {
        const restaurantName = parts[1].trim();
        console.log('Extracted restaurant name:', restaurantName);  // Log the extracted name
        return restaurantName;
      } else {
        console.error('Username does not contain @ symbol or incorrect format');
      }
    }
    return null;
  }

  private baseUrl = 'https://localhost:7121/api/Restaurant/GetRestaurantIdByName';

  public getRestaurantByName(): Observable<number> {
    const restaurantName = this.extractRestaurantName();
    console.log('Restaurant name used in API call:', restaurantName);  // Log the restaurant name
    
    if (restaurantName) {
      const url = `${this.baseUrl}/${restaurantName}`;
      console.log('Final API URL:', url);  // Log the full API URL
      return this.http.get<number>(url);
    } else {
      console.error('Restaurant name is null');
      return new Observable<number>();
    }
  }

  // Method to get the user role from the payload
  public getUserRole(): string | null {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      console.log('User Role:', userPayload.role);  // Log the user role
      return userPayload.role;
    }
    return null;
  }

  // Method to update the user payload when logging in
  public setUserPayload(userPayload: any): void {
    console.log('Storing user payload:', userPayload);  // Log the payload being stored
    localStorage.setItem('userPayload', JSON.stringify(userPayload));
    this.payload = userPayload;

    // Update both userName and userRole after successful login
    const userName = this.getUserName();
    console.log('User Name after storing payload:', userName);  // Debugging
    this.setUserName(userName);
    
    const userRole = this.getUserRole();
    console.log('User Role after storing payload:', userRole);  // Debugging
    this.setUserRole(userRole);
  }

  // Method to update user role and emit it to subscribers
  public setUserRole(role: string | null): void {
    this.userRoleSubject.next(role);
  }

  // Update user name and emit it to subscribers
  public setUserName(userName: string | null): void {
    this.userNameSubject.next(userName);
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userPayload');
        this.payload = null;
  
        // Emit null for both userName and userRole to indicate the user is logged out
        this.setUserName(null);
        this.setUserRole(null);
  
        this.router.navigate(['app-login']);
  
        Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
      }
    });
  }
  
}
