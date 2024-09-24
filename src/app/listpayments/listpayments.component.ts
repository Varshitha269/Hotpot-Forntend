import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listpayments',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listpayments.component.html',
  styleUrl: './listpayments.component.css'
})
export class ListpaymentsComponent {
   // Assume this gets populated with payment data from a service
   payments = [
    { id: 1, orderId: 1, amount: 500, paymentDate: new Date(), method: 'Credit Card', status: 'Completed' },
    { id: 2, orderId: 2, amount: 300, paymentDate: new Date(), method: 'PayPal', status: 'Pending' },
    { id: 3, orderId: 1, amount: 500, paymentDate: new Date(), method: 'Debit Card', status: 'Completed' },
    { id: 4, orderId: 3, amount: 450, paymentDate: new Date(), method: 'Net Banking', status: 'Failed' },
    { id: 5, orderId: 4, amount: 600, paymentDate: new Date(), method: 'Credit Card', status: 'Completed' },
    // Add more payments as needed
  ];
  
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get totalPages() {
    return Math.ceil(this.payments.length / this.itemsPerPage);
  }

  get paginatedPayments() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.payments.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

}
