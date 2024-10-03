import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../service/order.service';
import { PayloadService } from '../service/payload.service';

@Component({
  selector: 'app-listorders',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './listorders.component.html',
  styleUrls: ['./listorders.component.css']
})
export class ListordersComponent implements OnInit {
  orders: any[] = [];
  userid: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private orderService: OrderService, private payload: PayloadService) {}

  ngOnInit(): void {
    this.userid = this.payload.getUserId(); // Fetch userid from payload
    this.getOrdersByUserId();
  }

  getOrdersByUserId(): void {
    this.orderService.getOrdersByUserId(this.userid).subscribe(
      (response) => {
        this.orders = response; // Store the response in the orders array
        console.log('Orders retrieved:', this.orders);
      },
      (error) => {
        console.error('Error retrieving orders:', error);
      }
    );
  }

  get totalPages() {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // Function to check if the cancel button should be visible
  isCancelVisible(order: any): boolean {
    const orderDate = new Date(order.orderDate); // Parse the order date
    const currentDate = new Date(); // Get current date
    const diffInMinutes = (currentDate.getTime() - orderDate.getTime()) / 60000;

    //console.log('Order Date:', orderDate); // Log order date
   // console.log('Current Date:', currentDate); // Log current date
    //console.log('Difference in minutes:', diffInMinutes); // Log difference in minutes

    // Button is visible if order is created within the last 30 minutes and not cancelled
    return diffInMinutes <= 30 && order.orderStatus !== 'Cancelled';
  }

  // Function to cancel the order and update the order status
  cancelOrder(order: any): void {
    console.log('Canceling order with ID:', order.orderID); // Log the order ID
    this.orderService.updateOrderStatus(Number(order.orderID)).subscribe(
      (response) => {
        console.log('Order canceled:', response);
      },
      (error) => {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel the order. Please check the order ID and try again.');
      }
    );
  }
}
