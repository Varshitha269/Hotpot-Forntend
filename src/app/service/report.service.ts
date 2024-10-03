// report.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/datastructure';// Adjust the import path as necessary
import { User } from '../model/datastructure';// Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'https://localhost:7121/api/Report'; // Update the base URL as needed

  constructor(private http: HttpClient) {}

  // Get vegetarian menu items by restaurant ID
  getVegItems(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/veg-items/${restaurantId}`);
  }

  // Get non-vegetarian menu items by restaurant ID
  getNonVegItems(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/non-veg-items/${restaurantId}`);
  }

  // Get total menu items by restaurant ID
  getTotalMenuItems(restaurantId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-menu-items/${restaurantId}`);
  }

  // Get total categories by restaurant ID
  getTotalCategories(restaurantId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/total-categories/${restaurantId}`);
  }

  // Get total orders by restaurant ID
  getTotalOrders(restaurantId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-orders/${restaurantId}`);
  }

  // Get total revenue by restaurant ID
  getTotalRevenue(restaurantId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-revenue/${restaurantId}`);
  }

  // Get revenue by period
  getRevenueByPeriod(restaurantId: number, period: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenue/${restaurantId}/${period}`);
  }

  // Get average order value by restaurant ID
  getAverageOrderValue(restaurantId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-order-value/${restaurantId}`);
  }

  // Get top-selling items by restaurant ID and count
  getTopSellingItems(restaurantId: number, topN: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/top-selling-items/${restaurantId}/${topN}`);
  }

  // Get least-selling items by restaurant ID and count
  getLeastSellingItems(restaurantId: number, bottomN: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/least-selling-items/${restaurantId}/${bottomN}`);
  }

  // Get regular users by restaurant ID and minimum orders
  getRegularUsers(restaurantId: number, minOrders: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/regular-users/${restaurantId}/${minOrders}`);
  }
}
