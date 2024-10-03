import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
      return JSON.parse(this.storedUserPayload);
    }
    console.log('No user payload found in local storage.');
    return null;
  }

  // Method to get the user ID from the payload
  public getUserId(): string | null {
    const userPayload = this.getUserPayload();
    return userPayload ? userPayload.nameid : null;
  }

  // Method to get the user name from the payload
  public getUserName(): string | null {
    const userPayload = this.getUserPayload();
    return userPayload ? userPayload.unique_name : null;
  }

  // Extract restaurant name from the user name
  public extractRestaurantName(): string | null {
    const userName = this.getUserName();
    if (userName) {
      const parts = userName.split('@');
      return parts.length > 1 ? parts[1].trim() : null;
    }
    return null;
  }

  private baseUrl = 'https://localhost:7121/api/Restaurant/GetRestaurantIdByName';

  public getRestaurantByName(): Observable<number> {
    const restaurantName = this.extractRestaurantName();
    const url = `${this.baseUrl}/${restaurantName}`;
    return this.http.get<number>(url);
  }

  // Method to get the user role from the payload
  public getUserRole(): string | null {
    const userPayload = this.getUserPayload();
    return userPayload ? userPayload.role : null;
  }

  // Method to update the user payload when logging in
  public setUserPayload(userPayload: any): void {
    localStorage.setItem('userPayload', JSON.stringify(userPayload));
    this.payload = userPayload;

    // Update both userName and userRole after successful login
    this.setUserName(this.getUserName());
    this.setUserRole(this.getUserRole()); // Emit the role to subscribers
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
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('userPayload');
      this.payload = null;
      
      // Emit null for both userName and userRole to indicate the user is logged out
      this.setUserName(null);
      this.setUserRole(null);

      this.router.navigate(['app-login']);
    }
  }
}
