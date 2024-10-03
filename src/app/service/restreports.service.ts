import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestreportsService {

  private baseUrl = 'https://localhost:7121/api/Report';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  getDailySales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/daily-sales`);
  } 

  getWeeklySales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/weekly-sales`);
  }

  getMonthlySales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthly-sales`);
  }

  getYearlySales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/yearly-sales`);
  }

  getOrdersReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getMenuItemsReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menu-items`);
  }
}
