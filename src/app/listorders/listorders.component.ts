import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listorders',
  standalone: true,
  imports: [FormsModule,CommonModule,DatePipe],
  templateUrl: './listorders.component.html',
  styleUrl: './listorders.component.css'
})
export class ListordersComponent {
   // Assume this gets populated with order data from a service
   orders = [
    { id: 1, product: 'Product A', quantity: 2, price: 500, orderDate: new Date(), status: 'Delivered' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, price: 300, orderDate: new Date(), status: 'Pending' },
    // Add more orders as needed
  ];
  
  currentPage: number = 1;
  itemsPerPage: number = 10;

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

}
