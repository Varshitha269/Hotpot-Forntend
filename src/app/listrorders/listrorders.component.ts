import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../service/order.service'; // Adjust the path as necessary
import { RestaurantService } from '../service/restaurant.service'; // Import RestaurantService
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: 'app-listrorders',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './listrorders.component.html',
  styleUrls: ['./listrorders.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListrordersComponent implements OnInit {
  orders: any[] = []; // Initialize orders as an empty array
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Filters
  filterDate: string = '';
  filterStatus: string = '';

  restaurantID: number = 0; // Initialize restaurantID

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService, // Inject RestaurantService
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef for change detection
  ) {}

  ngOnInit(): void {
    this.fetchRestaurantId(); // Fetch restaurant ID when component initializes
  }

  // Fetch the restaurant ID dynamically
  fetchRestaurantId() {
    this.restaurantService.getRestaurantByName().subscribe({
      next: (restaurantId) => {
        this.restaurantID = Number(restaurantId); // Store the restaurant ID
        console.log(`Restaurant ID: ${this.restaurantID}`);

        // Once restaurant ID is retrieved, load the orders
        this.fetchOrders();
      },
      error: (err) => {
        console.error('Error fetching restaurant ID:', err);
      }
    });
  }

  // Fetch orders by restaurant ID
  fetchOrders() {
    if (this.restaurantID) { // Ensure restaurantID is valid before fetching
      this.orderService.getOrdersByRestaurantId(this.restaurantID).subscribe(
        (data) => {
          this.orders = data; // Assign fetched data to orders
          console.log('Fetched orders:', this.orders); // Log fetched orders
          this.cdr.detectChanges(); // Trigger change detection after fetching orders
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    }
  }

  // Total Pages Calculation
  get totalPages() {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  // Paginated and Filtered Orders
  get filteredOrders() {
    let filtered = this.orders;

    // Date Filter
    if (this.filterDate) {
      filtered = filtered.filter(order => 
        new Date(order.orderDate).toDateString() === new Date(this.filterDate).toDateString()
      );
    }

    // Status Filter
    if (this.filterStatus) {
      console.log('Current filter status:', this.filterStatus); // Log the filter status
      filtered = filtered.filter(order => 
        order.orderStatus?.toLowerCase() === this.filterStatus.toLowerCase() // Case-insensitive comparison
      );
    }

    // Pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  // Change Page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
