import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restruantpage',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './restruantpage.component.html',
  styleUrl: './restruantpage.component.css'
})
export class RestruantpageComponent {

  
  restarauntName: string = '';
  rating: number = 0;
  ratingsCount: string = '';
  priceForTwo: number = 0;
  cuisines: string[] = [];
  outletLocation: string = '';
  deliveryTime: number = 0;

  // Mock Data for Menu Categories and Items
  menuCategories = [
    {
      id: 1,
      name: 'Tiffins',
      items: [
        {
          name: 'Masala Dosa',
          price: 93,
          rating: 4.4,
          ratingsCount: 1338,
          description: 'A flavorful and savory Indian breakfast staple.',
          isBestseller: true,
          image: 'images/southindian.jpg'
        },
        {
          name: 'Plain Dosa',
          price: 74,
          rating: 4.6,
          ratingsCount: 629,
          description: 'Crispy golden brown goodness served hot off the griddle.',
          isBestseller: false,
          image: 'images/biriyani.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Dosa\'s',
      items: [
        {
          name: 'Paneer Dosa',
          price: 110,
          rating: 4.7,
          ratingsCount: 820,
          description: 'A dosa stuffed with seasoned paneer and spices.',
          isBestseller: true,
          image: 'images/pizza.jpg'
        },
        {
          name: 'Cheese Dosa',
          price: 120,
          rating: 4.8,
          ratingsCount: 900,
          description: 'Crispy dosa loaded with melted cheese.',
          isBestseller: true,
          image: 'images/icecream.jpg'
        }
      ]
    }
  ];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.restarauntName = res.rname;
      this.loadRestaurantData();
    });
  }

  // Function to load restaurant data
  loadRestaurantData() {
    this.rating = 4.5;
    this.ratingsCount = '9.5K';
    this.priceForTwo = 150;
    this.cuisines = ['Beverages', 'South Indian'];
    this.outletLocation = 'Himayath Nagar';
    this.deliveryTime = 25;
  }

  // Add item to cart function
  addItemToCart(item: any) {
    console.log('Item added to cart:', item);
  }

}
