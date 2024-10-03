import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuitemsService } from '../service/menuitems.service';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../service/restaurant.service';
import { CombinedData, Restaurant,Rating,MenuItem } from '../model/datastructure';
import { forkJoin } from 'rxjs';
import { FeedbackComponent } from '../feedback/feedback.component';


@Component({
  selector: 'app-restaurantcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurantcards.component.html',
  styleUrls: ['./restaurantcards.component.css'] // Corrected to styleUrls
})
export class RestaurantCardsComponent implements OnInit{
  restaurants: CombinedData[] = [];

  menuitems:any[]=[]
  
    constructor(private menuitemservice:MenuitemsService,private router: Router,private restaurantService: RestaurantService){
      
      this.menuitemservice.fetchMenuItems().subscribe((menuitems)=>{
        this.menuitems=menuitems;

      });
     }
     ngOnInit(): void {
      this.fetchAllRestaurants();
      
      
    }
    fetchAllRestaurants() {
      
      this.restaurantService.getAllRestaurants().subscribe(
        restaurants => {
          // Create an array of observables for the combined data requests
          const combinedDataRequests = restaurants.map(restaurant => 
            this.restaurantService.getCombinedDataForRestaurant(restaurant)
          );
  
          // Use forkJoin to wait for all requests to complete
          forkJoin(combinedDataRequests).subscribe(
            combinedDataArray => {
              this.restaurants = combinedDataArray;
            console.log("Restaurants Loaded: ", this.restaurants); 
            // Set the combined data
            },
            error => {
              console.error('Error fetching combined data for restaurants:', error);
            }
          );
        },
        error => {
          console.error('Error fetching restaurants:', error);
        }
      );
    }
    calculateAveragePrice(menuItems: MenuItem[]): number {
      const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
      return menuItems.length ? totalPrice / menuItems.length : 0;
    }
  
    // Get a random image from menu items
    getRandomImage(menuItems: MenuItem[]): string {
      return menuItems.length ? menuItems[Math.floor(Math.random() * menuItems.length)].imageUrl : '';
    }
  
    // Get unique categories
    getCategories(menuItems: MenuItem[]): string[] {
      return [...new Set(menuItems.map(item => item.category))];
    }
  
    // Calculate average rating
    calculateAverageRating(ratings: Rating[]): number {
      if (!ratings.length) return 0;
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      return parseFloat((totalRating / ratings.length).toFixed(1));
    }
    
    
  
    
  
    sort(type: string) {
    
      if (type === 'relevance') {
        // Sort by restaurant name (alphabetical order)
        this.restaurants.sort((a, b) => a.restaurant.name.localeCompare(b.restaurant.name));
      } 
      else if (type === 'rating') {
        // Sort by average rating (highest to lowest)
        this.restaurants.sort((a, b) => 
          this.calculateAverageRating(b.ratings) - this.calculateAverageRating(a.ratings)
        );
      } else if (type === 'costLh') {
        // Sort by average price (low to high)
        this.restaurants.sort((a, b) => 
          this.calculateAveragePrice(a.menuItems) - this.calculateAveragePrice(b.menuItems)
        );
      } else if (type === 'costHl') {
        // Sort by average price (high to low)
        this.restaurants.sort((a, b) => 
          this.calculateAveragePrice(b.menuItems) - this.calculateAveragePrice(a.menuItems)
        );
      }
      
      // Optional: log the sorted array for debugging
      console.log('Sorted restaurants:', this.restaurants);
    }
    
     
       
    
  


 

  naviagteToRestaruantFoods(categoryname:string)
  {
    this.router.navigate(['app-restaruants',categoryname])

  }
  naviagteToRestaruantmenu(id:number)
  {
    this.router.navigate(['app-restruantpage',id])
  }
  navigateToFeedbackForm(restaurantId: number) {
    this.router.navigate(['app-feedback', restaurantId]); // Adjust the route as needed
  }
}
