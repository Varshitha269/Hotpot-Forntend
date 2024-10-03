import { Component, OnInit } from '@angular/core';  
import { Chart, registerables } from 'chart.js';  
import { AdminDashboardService } from '../service/admindashboard.service';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { MenuStatisticsReport, OrderStatisticsReport,  
         PaymentStatisticsReport, RestaurantStatisticsReport, RevenueReport, UserStatisticsReport } from '../model/datastructure';  

// Register Chart.js components  
Chart.register(...registerables);  

@Component({  
  selector: 'app-reportsadmin',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './reportsadmin.component.html',  
  styleUrls: ['./reportsadmin.component.css'],  
})  
export class ReportsadminComponent implements OnInit {  
  orderStats!: OrderStatisticsReport;  
  restaurantStats!: RestaurantStatisticsReport;  
  userStats!: UserStatisticsReport;  
  menuStats!: MenuStatisticsReport;  
  paymentStats!: PaymentStatisticsReport;   
  deliveryPeopleCount: number = 0;   
  revenueReports: RevenueReport = {}; // Store raw revenue reports  
  selectedPeriod: string = 'daily'; // Default period  
  chartInstance: Chart | null = null; // Hold the Chart instance  

  constructor(private reportsService: AdminDashboardService) {}  

  ngOnInit(): void {  
    this.loadStatistics();  
    this.loadRevenueReports();  

  }  

  loadStatistics(): void {  
    this.reportsService.getOrderStatistics().subscribe(data => {  
      this.orderStats = data;  
      this.createOrderChart();  
    });  

    this.reportsService.getRestaurantStatistics().subscribe(data => {  
      this.restaurantStats = data;  
      this.createRestaurantChart();  
    });  

    this.reportsService.getUserStatistics().subscribe(data => {  
      this.userStats = data;  
      this.createUserChart();  
    });  

    this.reportsService.getPaymentStatistics().subscribe(data => {  
      this.paymentStats = data;  
      this.createPaymentChart();  
    });  

    // this.reportsService.getDeliveryStatistics().subscribe(data => {  
    //   this.deliveryPeopleCount = data.count; // Assuming your API returns an object with count property  
    // });  
  }  

  loadRevenueReports(): void {  
    this.reportsService.getRevenueReports(this.selectedPeriod).subscribe(  
      data => {  
        this.revenueReports = data; // Store fetched data  
        this.createRevenueChart();  
      },  
      error => {  
        console.error('Error fetching revenue reports:', error);  
      }  
    );  
  }  

  createRevenueChart(): void {  
    const canvasElement = document.getElementById('revenueChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  

    if (this.chartInstance) {  
      this.chartInstance.destroy(); // Destroy previous instance if exists  
    }  

    if (ctx) {  
      const labels = Object.keys(this.revenueReports);  
      const dataValues = Object.values(this.revenueReports);  

      this.chartInstance = new Chart(ctx, {  
        type: 'line', // Can change to 'bar' as needed  
        data: {  
          labels: labels,  
          datasets: [{  
            label: 'Revenue',  
            data: dataValues,  
            borderColor: '#36A2EB',  
            backgroundColor: 'rgba(54, 162, 235, 0.2)',  
            fill: true,  
          }]  
        },  
        options: {  
          responsive: true,  
          scales: {  
            y: {  
              beginAtZero: true  
            }  
          }  
        }  
      });  
    } else {  
      console.error('Failed to get context for revenue chart');  
    }  
  }  

  onPeriodChange(period: string): void {  
    this.selectedPeriod = period;  
    this.loadRevenueReports(); // Reload reports when changing period  
  }  

  createOrderChart(): void {  
    const canvasElement = document.getElementById('orderChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  
  
    if (ctx) {  
      const data = [  
        this.orderStats.received,  
        this.orderStats.delivered,  
        this.orderStats.cancelled,  
        this.orderStats.processing  
      ];  
  
      new Chart(ctx, {  
        type: 'bar',  
        data: {  
          labels: ['Received', 'Delivered', 'Cancelled', 'Processing'],  
          datasets: [{ label: 'Order Statistics', data: data, backgroundColor: ['#36A2EB', '#4CAF50', '#FF6384', '#FFCE56'] }]  
        },  
        options: { responsive: true }  
      });  
    } else {  
      console.error('Failed to get context for order chart');  
    }  
  }  
  
  createRestaurantChart(): void {  
    const canvasElement = document.getElementById('restaurantChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  
  
    if (ctx) {  
      const data = [this.restaurantStats.activeRestaurants, this.restaurantStats.inactiveRestaurants];  
  
      new Chart(ctx, {  
        type: 'pie',  
        data: {  
          labels: ['Active Restaurants', 'Inactive Restaurants'],  
          datasets: [{ label: 'Restaurant Statistics', data: data, backgroundColor: ['#17A2B8', '#FF6384'] }]  
        },  
        options: { responsive: true }  
      });  
    } else {  
      console.error('Failed to get context for restaurant chart');  
    }  
  }  
  
  createUserChart(): void {  
    const canvasElement = document.getElementById('userChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  
  
    if (ctx) {  
      const data = [this.userStats.activeUsers, this.userStats.inactiveUsers];  
  
      new Chart(ctx, {  
        type: 'pie',  
        data: {  
          labels: ['Active Users', 'Inactive Users'],  
          datasets: [{ label: 'User Statistics', data: data, backgroundColor: ['#20C997', '#FF6384'] }]  
        },  
        options: { responsive: true }  
      });  
    } else {  
      console.error('Failed to get context for user chart');  
    }  
  }  
  
  createMenuChart(): void {  
    const canvasElement = document.getElementById('menuChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  
  
    if (ctx) {  
      const data = [this.menuStats.activeMenus, this.menuStats.inactiveMenus];  
  
      new Chart(ctx, {  
        type: 'pie',  
        data: {  
          labels: ['Active Menus', 'Inactive Menus'],  
          datasets: [{ label: 'Menu Statistics', data: data, backgroundColor: ['#36A2EB', '#FF6384'] }]  
        },  
        options: { responsive: true }  
      });  
    } else {  
      console.error('Failed to get context for menu chart');  
    }  
  }  
  
  createPaymentChart(): void {  
    const canvasElement = document.getElementById('paymentChart') as HTMLCanvasElement;  
    const ctx = canvasElement.getContext('2d');  
  
    if (ctx) {  
      const data = [this.paymentStats.completedPayments, this.paymentStats.failedPayments, this.paymentStats.pendingPayments];  
  
      new Chart(ctx, {  
        type: 'pie',  
        data: {  
          labels: ['Completed Payments', 'Failed Payments', 'Pending Payments'],  
          datasets: [{ label: 'Payment Statistics', data: data, backgroundColor: ['#36A2EB', '#FF6384', '#36F3E5'] }]  
        },  
        options: { responsive: true }  
      });  
    } else {  
      console.error('Failed to get context for payment chart');  
    }  
  }  
}