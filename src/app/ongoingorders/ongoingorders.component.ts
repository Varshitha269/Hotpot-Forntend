import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ongoingorders',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './ongoingorders.component.html',
  styleUrl: './ongoingorders.component.css'
})
export class OngoingordersComponent {
  orders = [
    { id: 1, userId: 101, menuItem: 'Pizza', quantity: 2, price: 500, orderDate: new Date('2023-09-25T08:00:00'), status: 'Pending' },
    { id: 2, userId: 102, menuItem: 'Burger', quantity: 1, price: 300, orderDate: new Date('2023-09-25T10:00:00'), status: 'In Progress' },
    { id: 3, userId: 101, menuItem: 'Pasta', quantity: 3, price: 700, orderDate: new Date('2023-09-24T09:00:00'), status: 'Cancelled' },
    { id: 4, userId: 103, menuItem: 'Salad', quantity: 2, price: 400, orderDate: new Date('2023-09-23T07:30:00'), status: 'In Progress' },
    { id: 5, userId: 102, menuItem: 'Sandwich', quantity: 5, price: 600, orderDate: new Date(), status: 'Pending' },
    { id: 6, userId: 104, menuItem: 'Fries', quantity: 1, price: 150, orderDate: new Date(), status: 'Pending' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Get the current date to compare with orderDate
  today = new Date();

  // Function to check if an order is ongoing and was placed today
  isOngoingOrder(order: any): boolean {
    const todayDate = new Date(this.today.setHours(0, 0, 0, 0));
    const orderDate = new Date(new Date(order.orderDate).setHours(0, 0, 0, 0));
    
    // Check if the order is either 'Pending' or 'In Progress' and placed today
    return (order.status === 'Pending' || order.status === 'In Progress') && orderDate.getTime() === todayDate.getTime();
  }

  // Filter for ongoing orders placed today
  get ongoingOrdersForToday() {
    return this.orders.filter(order => this.isOngoingOrder(order));
  }

  // Pagination logic for ongoing orders
  get totalPages() {
    return Math.ceil(this.ongoingOrdersForToday.length / this.itemsPerPage);
  }

  get paginatedOngoingOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.ongoingOrdersForToday.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

}
