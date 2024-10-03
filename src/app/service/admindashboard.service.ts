// admin-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuStatisticsReport, OrderStatisticsReport, PaymentStatisticsReport, RestaurantStatisticsReport, RevenueReport, UserStatisticsReport } from '../model/datastructure';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'https://localhost:7121/api/ReportsService';  

  private baseUrl = 'https://localhost:7121/api/AdminDashboard';  

  constructor(private http: HttpClient) {}  

  getOrderStatistics(): Observable<OrderStatisticsReport> {  
    return this.http.get<OrderStatisticsReport>(`${this.apiUrl}/order-statistics`);  
  }  

  getRestaurantStatistics(): Observable<RestaurantStatisticsReport> {  
    return this.http.get<RestaurantStatisticsReport>(`${this.apiUrl}/restaurant-statistics`);  
  }  

  getUserStatistics(): Observable<UserStatisticsReport> {  
    return this.http.get<UserStatisticsReport>(`${this.apiUrl}/user-statistics`);  
  }  

  // getMenuStatistics(): Observable<MenuStatisticsReport> {  
  //   return this.http.get<MenuStatisticsReport>(`${this.apiUrl}/menu-statistics`);  
  // }  

  getPaymentStatistics(): Observable<PaymentStatisticsReport> {  
    return this.http.get<PaymentStatisticsReport>(`${this.apiUrl}/payment-statistics`);  
  }  

  getRevenueReports(period: string): Observable<RevenueReport> {  
    return this.http.get<RevenueReport>(`${this.baseUrl}/revenue?period=${period}`);  
  } 
}  