import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CombinedData, MenuItem, Category, Cart } from '../model/datastructure';
import { RestaurantService } from '../service/restaurant.service';
import { CartService } from '../service/cart.service';
import { PayloadService } from '../service/payload.service';
import Swal from 'sweetalert2';

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

  cart: Cart[] = [];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartservice: CartService,
    private router: Router,
    private payload: PayloadService
  ) {
    this.loadCartDetails();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const restaurantId = params.get('id');
        if (restaurantId) {
            const id = +restaurantId;
            if (!isNaN(id)) {
                this.fetchCombinedData(id);
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
    return this.combinedData?.ratings.length || 0;
  }

  calculatePriceForTwo(): number {
    return 2 * 100;
  }

  calculateDeliveryTime(): number {
    return 25;
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
      console.log('Cart items:', result);
      this.loadcartdata = result;
    });
  }

  addItemToCart(item: MenuItem): void {
    if (!item.isInStock) {
      Swal.fire({
        icon: 'warning',
        title: 'Out of Stock',
        text: 'This item is not in stock.',
      });
      return;
    }

    const currentTime = new Date();

    if (item.availabilityTime !== "Anytime") {
      const [startTime, endTime] = item.availabilityTime.split(' - ').map(time => this.convertToDate(currentTime, time.trim()));
      if (currentTime < startTime || currentTime > endTime) {
        Swal.fire({
          icon: 'info',
          title: 'Item Availability',
          text: `You can only order this item between ${item.availabilityTime}.`,
        });
        return;
      }
    }

    if (this.loadcartdata.length > 0) {
      const existingRestaurantId = this.loadcartdata[0].restaurantId;

      this.restaurantService.getRestaurantIdByMenuId(item.menuID).subscribe((result) => {
        this.restaid = result;

        if (existingRestaurantId !== this.restaid) {
          Swal.fire({
            icon: 'error',
            title: 'Different Restaurant',
            text: 'You can only add items from the same restaurant.',
          });
          return;
        }

        this.addToCart(item);
      });
    } else {
      this.addToCart(item);
    }
  }

  private convertToDate(currentDate: Date, time: string): Date {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const date = new Date(currentDate);

    const adjustedHours = period === 'PM' && hours < 12 ? hours + 12 : hours;
    date.setHours(adjustedHours % 24, minutes || 0, 0, 0);
    return date;
  }

  private addToCart(item: MenuItem): void {
    console.log('Item added to cart:', item);
    const userId = this.payload.getUserId();

    if (userId === '') {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'You need to log in to add items to the cart.',
      }).then(() => {
        this.router.navigate(['/app-login']);
      });
      return;
    }

    const newCartItem: Cart = {
      cartID: 0,
      userID: Number(userId),
      menuItemID: item.menuItemID,
      quantity: 1,
      price: item.price,
      createdDate: new Date()
    };

    this.cartservice.addCartDetails(newCartItem).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: 'Item added to the cart successfully!',
        });
        this.loadCartDetails();
      },
      (error) => {
        console.error('Error adding Cart details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding Cart details. Please try again.',
        });
      }
    );
  }
}
