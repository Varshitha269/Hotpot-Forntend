import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaruants',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './restaruants.component.html',
  styleUrl: './restaruants.component.css'
})
export class RestaruantsComponent {
  restaurants = [
    {
      name: "La Pino'z Pizza",
      cuisine: "Italian, Pizzas, Fast Food, Mexican, Desserts, Beverages",
      rating: 3.8,
      deliveryTime: 42,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/biriyani.jpg"
    },
    {
      name: "Bercos - If you love Chinese",
      cuisine: "Chinese, Thai, Asian, Beverages, Desserts",
      rating: 4.0,
      deliveryTime: 33,
      cost: 500,
      offer: "50% off | Use WELCOME50",
      image: "images/burger.jpg"
    },
    {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    },
    {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    },
    {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    },
    {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    }, {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    },
    {
      name: "Wack Waffles & Brownies",
      cuisine: "Waffle, Bakery, Desserts, Beverages",
      rating: 3.9,
      deliveryTime: 34,
      cost: 250,
      offer: "50% off | Use WELCOME50",
      image: "images/southindian.jpg"
    }
    // Add more restaurants here
  ];

  sort(type: string) {
    if (type === 'relevance') {
      this.restaurants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'delivery') {
      this.restaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (type === 'rating') {
      this.restaurants.sort((a, b) => b.rating - a.rating);
    } else if (type === 'costLh') {
      this.restaurants.sort((a, b) => a.cost - b.cost);
    } else if (type === 'costHl') {
      this.restaurants.sort((a, b) => b.cost - a.cost);
    }
  }

}
