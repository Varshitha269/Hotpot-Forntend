import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private getpaymentURL="https://localhost:7121/api/Payments";
  constructor(private http:HttpClient) { }
  fetchPaymentDetails():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.getpaymentURL}`)

  }

  
}
