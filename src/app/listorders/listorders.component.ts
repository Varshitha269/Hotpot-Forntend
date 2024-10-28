import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../service/order.service';
import { PayloadService } from '../service/payload.service';
import Swal from 'sweetalert2';

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

    // Button is visible if order is created within the last 30 minutes and not cancelled
    return diffInMinutes <= 30 && order.orderStatus !== 'Cancelled';
  }

  // Function to cancel the order and update the order status
  cancelOrder(order: any): void {
    console.log('Canceling order with ID:', order.orderID); // Log the order ID

    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Create an updated order object
        const updatedOrder = {
          ...order, // Spread the existing order properties
          orderStatus: 'Cancelled' // Update the order status
        };

        this.orderService.updateOrderStatus(updatedOrder).subscribe(
          (response) => {
            Swal.fire({
              title: 'Cancelled!',
              text: 'Your order has been canceled.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.getOrdersByUserId();
          },
          (error) => {
            console.error('Error cancelling order:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to cancel the order. Please check the order ID and try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}
