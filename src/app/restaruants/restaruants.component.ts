import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuitemsService } from '../service/menuitems.service';
import { RestaurantService } from '../service/restaurant.service';
import { RestaurantwithMenuItems, MenuItem, Rating } from '../model/datastructure';

@Component({
  selector: 'app-restaruants',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './restaruants.component.html',
  styleUrls: ['./restaruants.component.css']
})
export class RestaruantsComponent implements OnInit {
  restaurants: RestaurantwithMenuItems[] = [];
  filteredRestaurants: RestaurantwithMenuItems[] = [];
  menuItemName: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private menuitemservice: MenuitemsService,
    private router: Router,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the menuItemName from the URL
    this.route.paramMap.subscribe(params => {
      this.menuItemName = params.get('name') || '';
      console.log('Menu Item Name from Params:', this.menuItemName);
      if (this.menuItemName) {
        this.getRestaurantsWithMenuItemName(this.menuItemName);
      } else {
        // Optionally, handle the case where menuItemName is empty
        this.filteredRestaurants = []; // Clear or reset the filtered list
      }
      this.cdr.detectChanges(); 
    });
  }

  getRestaurantsWithMenuItemName(menuItemName: string) {
    // Call the restaurantService to get filtered restaurants by menu item name
    this.restaurantService.getRestaurantsWithMenuItemName(menuItemName).subscribe(
      (filteredData: RestaurantwithMenuItems[]) => {
        this.filteredRestaurants = filteredData; // Assign the filtered data
        this.cdr.detectChanges(); // Trigger change detection if needed
      },
      error => {
        console.error('Error fetching restaurants with menu item:', error);
      }
    );
  }

  // Calculate the average price for menu items
  calculateAveragePrice(menuItems: MenuItem[]): number {
    const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
    return menuItems.length ? totalPrice / menuItems.length : 0;
  }

  // Get a random image URL from the menu items
  getRandomImage(menuItems: MenuItem[]): string {
    return menuItems.length ? menuItems[Math.floor(Math.random() * menuItems.length)].imageUrl : '';
  }

  // Get unique categories from the menu items
  getCategories(menuItems: MenuItem[]): string[] {
    return [...new Set(menuItems.map(item => item.category))];
  }

  // Calculate the average rating for a restaurant
  calculateAverageRating(ratings: Rating[]): number {
    if (!ratings.length) return 0;
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return parseFloat((totalRating / ratings.length).toFixed(1));
  }

  // Navigate to a restaurant's menu page using its id
  navigateToRestaurantMenu(id: number) {
    this.router.navigate(['app-restruantpage', id]);
  }
}
