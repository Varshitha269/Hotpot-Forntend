import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listrorders',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './listrorders.component.html',
  styleUrl: './listrorders.component.css'
})
export class ListrordersComponent {
  orders = [
    { id: 1, userId: 101, menuItem: 'Pizza', quantity: 2, price: 500, orderDate: new Date('2023-09-10'), status: 'Delivered' },
    { id: 2, userId: 102, menuItem: 'Burger', quantity: 1, price: 300, orderDate: new Date('2023-09-11'), status: 'Pending' },
    { id: 3, userId: 101, menuItem: 'Pasta', quantity: 3, price: 700, orderDate: new Date('2023-09-12'), status: 'Cancelled' },
    { id: 4, userId: 103, menuItem: 'Salad', quantity: 2, price: 400, orderDate: new Date('2023-09-08'), status: 'Delivered' },
    { id: 5, userId: 102, menuItem: 'Sandwich', quantity: 5, price: 600, orderDate: new Date('2023-09-15'), status: 'Pending' },
    { id: 6, userId: 104, menuItem: 'Fries', quantity: 1, price: 150, orderDate: new Date('2023-09-18'), status: 'Delivered' },
    { id: 7, userId: 105, menuItem: 'Taco', quantity: 3, price: 350, orderDate: new Date('2023-09-13'), status: 'In Progress' },
    { id: 8, userId: 106, menuItem: 'Steak', quantity: 1, price: 1000, orderDate: new Date('2023-09-20'), status: 'Pending' },
    { id: 9, userId: 107, menuItem: 'Fish and Chips', quantity: 2, price: 850, orderDate: new Date('2023-09-09'), status: 'Delivered' },
    { id: 10, userId: 108, menuItem: 'Ice Cream', quantity: 4, price: 200, orderDate: new Date('2023-09-22'), status: 'Pending' },
    { id: 11, userId: 109, menuItem: 'Sushi', quantity: 3, price: 900, orderDate: new Date('2023-09-19'), status: 'In Progress' },
    { id: 12, userId: 110, menuItem: 'Ramen', quantity: 2, price: 600, orderDate: new Date('2023-09-21'), status: 'Cancelled' },
    { id: 13, userId: 111, menuItem: 'Donuts', quantity: 6, price: 150, orderDate: new Date('2023-09-14'), status: 'Delivered' },
    { id: 14, userId: 112, menuItem: 'Waffles', quantity: 2, price: 500, orderDate: new Date('2023-09-16'), status: 'Pending' },
    { id: 15, userId: 113, menuItem: 'Pancakes', quantity: 2, price: 400, orderDate: new Date('2023-09-17'), status: 'Cancelled' },
    { id: 16, userId: 114, menuItem: 'Hotdog', quantity: 3, price: 300, orderDate: new Date('2023-09-07'), status: 'In Progress' },
    { id: 17, userId: 115, menuItem: 'BBQ Ribs', quantity: 1, price: 1200, orderDate: new Date('2023-09-05'), status: 'Delivered' },
    { id: 18, userId: 116, menuItem: 'Pancakes', quantity: 4, price: 800, orderDate: new Date('2023-09-06'), status: 'Pending' },
    { id: 19, userId: 117, menuItem: 'Salmon Sushi', quantity: 3, price: 900, orderDate: new Date('2023-09-03'), status: 'Cancelled' },
    { id: 20, userId: 118, menuItem: 'Veggie Pizza', quantity: 1, price: 550, orderDate: new Date('2023-09-02'), status: 'Pending' }
  ];
  
  
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Filters
  filterDate: string = '';
  filterStatus: string = '';
  filterMenuItem: string = '';

  // Total Pages Calculation
  get totalPages() {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  // Paginated and Filtered Orders
  get filteredOrders() {
    let filtered = this.orders;

    if (this.filterDate) {
      filtered = filtered.filter(order => 
        new Date(order.orderDate).toDateString() === new Date(this.filterDate).toDateString()
      );
    }

    if (this.filterStatus) {
      filtered = filtered.filter(order => order.status === this.filterStatus);
    }

    if (this.filterMenuItem) {
      filtered = filtered.filter(order => order.menuItem.toLowerCase().includes(this.filterMenuItem.toLowerCase()));
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  // Change Page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

}
