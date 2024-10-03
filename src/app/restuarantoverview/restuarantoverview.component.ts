import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Restaurant } from '../model/datastructure';
import { RestuarantoverviewService } from '../service/restuarantoverview.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restuarantoverview',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './restuarantoverview.component.html',
  styleUrl: './restuarantoverview.component.css'
})
export class RestuarantoverviewComponent implements OnInit{
  restaurants: Restaurant[] = [];
  paginatedRestaurants: Restaurant[] = [];
  restaurantForm: FormGroup;
  page = 1;
  totalPages = 1;
  pageSize = 10;
  loading = false;
  notificationMessage = '';
  isAddRestaurantFormOpen = false;

  constructor(private fb: FormBuilder, private restaurantService: RestuarantoverviewService) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      phNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      operatingHours: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.loading = true;
    this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data;
      this.totalPages = Math.ceil(this.restaurants.length / this.pageSize);
      this.paginateRestaurants();
      this.loading = false;
    });
  }

  paginateRestaurants(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    this.paginatedRestaurants = this.restaurants.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    this.page = page;
    this.paginateRestaurants();
  }

  showAddRestaurantForm(): void {
    this.isAddRestaurantFormOpen = true;
  }

  closeAddRestaurantForm(): void {
    this.isAddRestaurantFormOpen = false;
  }

  createRestaurant(): void {
    if (this.restaurantForm.valid) {
      const newRestaurant = this.restaurantForm.value as Restaurant;
      this.restaurantService.createRestaurant(newRestaurant).subscribe(() => {
        this.fetchRestaurants();
        this.closeAddRestaurantForm();
        this.notificationMessage = 'Restaurant added successfully!';
        this.restaurantForm.reset();
      });
    }
  }

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.fetchRestaurants();
      this.notificationMessage = 'Restaurant deleted successfully!';
    });
  }
}