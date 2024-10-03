import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-orderoverview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orderoverview.component.html',
  styleUrls: ['./orderoverview.component.css']
})
export class OrderoverviewComponent implements AfterViewInit, OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  page: number = 1;
  pageSize: number = 10; // Default page size; can be adjusted dynamically
  statusFilter: string = '';
  selectedOrder: Order | null = null; // Allow null

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit(): void {}

  loadOrders() {
    const storedOrders = localStorage.getItem('orders');
    this.orders = storedOrders ? JSON.parse(storedOrders) : this.generateDummyOrders();
    this.updateFilteredOrders();
  }

  generateDummyOrders(): Order[] {
    const statuses = ['completed', 'pending', 'ongoing'];
    const paymentStatuses = ['Paid', 'Pending Payment', 'Refunded'];
    const addresses = [
      '123 Elm St, Springfield, IL',
      '456 Maple Ave, Metropolis, NY',
      '789 Oak St, Gotham City, NJ',
      '101 Pine Rd, Smallville, KS',
      '202 Birch Ln, Star City, CA'
    ];

    const orders: Order[] = [];
    for (let i = 1; i <= 100; i++) {
      orders.push({
        orderID: i,
        userID: i,
        restaurantID: i,
        orderDate: new Date(),
        totalAmount: Math.floor(Math.random() * 100) + 1,
        orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      deliveryAddress: addresses[Math.floor(Math.random() * addresses.length)]
      });
    }
    localStorage.setItem('orders', JSON.stringify(orders));
  return orders;
  }

  updateFilteredOrders() {
    this.filteredOrders = this.orders
      .filter(order => (this.statusFilter ? order.orderStatus === this.statusFilter : true))
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }
  viewOrder(order: Order): void {
    this.selectedOrder = order; // Set the selected order for the modal
  }
  
  closeModal(): void {
    this.selectedOrder = null; 
  }
  filterOrders() {
    this.page = 1; // Reset to first page when filtering
    this.updateFilteredOrders();
  }

  changePage(page: number) {
    this.page = page;
    this.updateFilteredOrders();
  }

  // Method to dynamically set page size
  setPageSize(size: number) {
    this.pageSize = size;
    this.page = 1; // Reset to first page
    this.updateFilteredOrders();
  }

  // Additional logic for total pages calculation
  get totalPages(): number {
    return Math.ceil(this.orders.filter(order => this.statusFilter ? order.orderStatus === this.statusFilter : true).length / this.pageSize);
  }
}
