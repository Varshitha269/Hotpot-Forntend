import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CombinedData, MenuItem, Category } from '../model/datastructure';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restruantpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './restruantpage.component.html',
  styleUrls: ['./restruantpage.component.css']
})
export class RestruantpageComponent implements OnInit {
  restaurantId!: number;
  combinedData: CombinedData | null = null; 
  categories: Category[] = []; 

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const restaurantId = params.get('id'); // Get ID from route parameters
        if (restaurantId) {
            const id = +restaurantId; // Convert to a number
            if (!isNaN(id)) {
                this.fetchCombinedData(id); // Make API call with valid ID
            } else {
                console.error('Invalid restaurant ID:', restaurantId);
            }
        } else {
            console.error('No restaurant ID found in route parameters.');
        }
    });
}

fetchCombinedData(restaurantId: number) {
    this.restaurantService.getCombinedData1(restaurantId).subscribe(
        data => {
            console.log('Combined data:', data);
            this.combinedData = data;
        },
        error => {
            console.error('Error fetching combined data:', error);
        }
    );
}

  calculateAverageRating(): number {
    if (!this.combinedData || this.combinedData.ratings.length === 0) return 0;
    const totalRating = this.combinedData.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return parseFloat((totalRating / this.combinedData.ratings.length).toFixed());
  }

  getTotalRatingsCount(): number {
    return this.combinedData?.ratings.length || 0; // Returns the count of ratings or 0 if not available
  }

  calculatePriceForTwo(): number {
    return 2 * 100; // Replace with actual logic
  }

  calculateDeliveryTime(): number {
    return 25; // Replace with actual logic
  }

  getMenuCategories(): Category[] {
    if (!this.combinedData || !this.combinedData.menuItems) return [];
    const categoriesMap: { [key: string]: Category } = {};
    let categoryIdCounter = 1;

    this.combinedData.menuItems.forEach(item => {
        const categoryName = item.category;
        if (!categoriesMap[categoryName]) {
            categoriesMap[categoryName] = { id: categoryIdCounter++, name: categoryName, items: [] };
        }
        categoriesMap[categoryName].items.push(item);
    });

    return Object.values(categoriesMap);
}

  calculateItemRating(item: MenuItem): number {
    const ratingsForItem = this.combinedData?.ratings.filter(r => r.restaurantID === item.menuID) || [];
    if (ratingsForItem.length === 0) return 0;
    const totalItemRating = ratingsForItem.reduce((sum, rating) => sum + rating.rating, 0);
    return parseFloat((totalItemRating / ratingsForItem.length).toFixed(1));
  }

  getItemRatingsCount(item: MenuItem): number {
    return (this.combinedData?.ratings.filter(r => r.restaurantID === item.menuID).length) || 0;
  }

  addItemToCart(item: MenuItem): void {
    console.log('Item added to cart:', item);
  }
}
