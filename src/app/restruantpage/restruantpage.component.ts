import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CombinedData, MenuItem, Category,Cart } from '../model/datastructure';
import { RestaurantService } from '../service/restaurant.service';
import { CartService } from '../service/cart.service';

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
  restaid!:number;
  loadcartdata:any[]=[];

  cart:Cart[]=[];

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService,private cartservice:CartService,) {
    this.loadCartDetails();
  }

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
  private loadCartDetails() {
    this.cartservice.getCartDetails().subscribe((result) => {
      console.log('Cart items:', result); // Log the result to inspect
      this.loadcartdata = result;
      
    });
  }


  


  addItemToCart(item: MenuItem): void {
    if (!item.isInStock) {
      alert('This item is not in stock.');
      return; 
    }

    const currentTime = new Date();

  // Check if availabilityTime is "Anytime"
  if (item.availabilityTime !== "Anytime") {
    const [startTime, endTime] = item.availabilityTime.split(' - ').map(time => this.convertToDate(currentTime, time.trim()));

    // Check if current time is within the allowed range
    if (currentTime < startTime || currentTime > endTime) {
      alert(`You can only order this item between ${item.availabilityTime}.`);
      return;
    }
  }
  
    if (this.loadcartdata.length > 0) {
      const existingRestaurantId = this.loadcartdata[0].restaurantId;
  
      // Fetch the restaurant ID based on the menu item
      this.restaurantService.getRestaurantIdByMenuId(item.menuID).subscribe((result) => {
        this.restaid = result;
  
        // Check if the restaurant IDs match after we have received the response
        if (existingRestaurantId !== this.restaid) {
          alert('You can only add items from the same restaurant.');
          return; 
        }
  
        // If they match, proceed to add the item to the cart
        this.addToCart(item);
      });
    } else {
      // If the cart is empty, just add the item to the cart directly
      this.addToCart(item);
    }
  }
  
  private convertToDate(currentDate: Date, time: string): Date {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const date = new Date(currentDate);
    
    // Convert to 24-hour format
    const adjustedHours = period === 'PM' && hours < 12 ? hours + 12 : hours;
    date.setHours(adjustedHours % 24, minutes || 0, 0, 0); // Reset seconds and milliseconds
    return date;
  }

  private addToCart(item: MenuItem): void {
    console.log('Item added to cart:', item);
    const newCartItem: Cart = {
      cartID: 0,
      userID: 1,
      menuItemID: item.menuItemID,
      quantity: 1,
      price: item.price,
      createdDate: new Date() // Set current date
    };
  
    this.cartservice.addCartDetails(newCartItem).subscribe(
      (response) => {
        alert('Item added to the cart');
        // Optionally reload cart details after adding the item
        this.loadCartDetails();
      },
      (error) => {
        console.error('Error adding Cart details:', error);
        alert('An error occurred while adding Cart details. Please try again.');
      }
    );
  }
  
  
}
