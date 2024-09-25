import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-listpayments',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listpayments.component.html',
  styleUrl: './listpayments.component.css'
})
export class ListpaymentsComponent {
   // Assume this gets populated with payment data from a service


   payments:any[]=[];
   constructor(private paymentservice:PaymentService){
    this.paymentservice.fetchPaymentDetails().subscribe((payments)=>{
      this.payments=payments;

    });
   }


  
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
