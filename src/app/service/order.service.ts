import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseurl = "https://localhost:7121/api/Checkout/place-order";
  private orderurl="https://localhost:7121/api/Order";
  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseurl}`, orderData);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.orderurl}`);
  }

  getOrdersByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.orderurl}/user/${userId}`);
  }

  getOrdersByRestaurantId(restaurantId: number): Observable<any> {
    return this.http.get(`${this.orderurl}/restaurant/${restaurantId}`);
  }

  
  updateOrderStatus(order: any): Observable<any> {
    const orderId = order.orderID; // Assuming orderID is part of the order object
    return this.http.put(`${this.orderurl}/${orderId}`, order); // Use the PUT method to update the order
  }
  





}
