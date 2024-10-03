import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminoverview',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './adminoverview.component.html',
  styleUrl: './adminoverview.component.css'
})
export class AdminoverviewComponent  implements OnInit{
  constructor(private router: Router) { }

  // navigateToUsers() {
  //   this.router.navigate(['/app-useroverview']);
  // }

  navigateToOrders() {
    this.router.navigate(['/app-orderoverview']);
  }

  navigateToMenu() {
    this.router.navigate(['/app-menuoverview']);
  }

  // navigateToAnalytics() {
  //   this.router.navigate(['/analytics']);
  // }

  // navigateToPromotions() {
  //   this.router.navigate(['/promotions']);
  // }
  totalUsers: number = 0;  
  totalOrders: number = 0;  
  totalMenuItems: number = 0;  
  totalRevenue: number = 0;  
  averageDeliveryTime: number = 0;  

  ngOnInit(): void {  
    this.fetchAdminData();  
  }  

  fetchAdminData() {  
    // Simulate fetching data from a backend service  
    this.totalUsers = 150; // Example data  
    this.totalOrders = 300; // Example data  
    this.totalMenuItems = 50; // Example data  
    this.totalRevenue = 5000; // Example data  
    this.averageDeliveryTime = 30; // Example data in minutes  
  }  
}
