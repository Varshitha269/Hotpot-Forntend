import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuitemsService } from '../service/menuitems.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-restaurantcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurantcards.component.html',
  styleUrls: ['./restaurantcards.component.css'] // Corrected to styleUrls
})
export class RestaurantCardsComponent {
  menuitems:any[]=[]
    constructor(private menuitemservice:MenuitemsService,private router: Router){
      this.menuitemservice.fetchMenuItems().subscribe((menuitems)=>{
        this.menuitems=menuitems;

      });
     }
     
       
    
  

  // Popular restaurants data with additional fields
  // List of restaurants
  restaurants = [
    {
        id: 1,
        name: "La Pino'z Pizza",
        cuisine: "Italian, Pizzas, Fast Food, Mexican, Desserts, Beverages",
        rating: 3.8,
        deliveryTime: 42,
        cost: 250,
        offer: "50% off | Use WELCOME50",
        image: "images/biriyani.jpg"
    },
    {
        id: 1,
        name: "Bercos - If you love Chinese",
        cuisine: "Chinese, Thai, Asian, Beverages, Desserts",
        rating: 4.0,
        deliveryTime: 33,
        cost: 500,
        offer: "50% off | Use WELCOME50",
        image: "images/burger.jpg"
    },
    {
        id: 1,
        name: "Wack Waffles & Brownies",
        cuisine: "Waffle, Bakery, Desserts, Beverages",
        rating: 3.9,
        deliveryTime: 34,
        cost: 250,
        offer: "50% off | Use WELCOME50",
        image: "images/southindian.jpg"
    },
    {
        id: 1,
        name: "Wack Waffles & Brownies",
        cuisine: "Waffle, Bakery, Desserts, Beverages",
        rating: 3.9,
        deliveryTime: 34,
        cost: 250,
        offer: "50% off | Use WELCOME50",
        image: "images/southindian.jpg"
    },
    {
        id: 1,
        name: "Wack Waffles & Brownies",
        cuisine: "Waffle, Bakery, Desserts, Beverages",
        rating: 3.9,
        deliveryTime: 34,
        cost: 250,
        offer: "50% off | Use WELCOME50",
        image: "images/southindian.jpg"
    },
    {
        id: 1,
        name: "Wack Waffles & Brownies",
        cuisine: "Waffle, Bakery, Desserts, Beverages",
        rating: 3.9,
        deliveryTime: 34,
        cost: 250,
        offer: "50% off | Use WELCOME50",
        image: "images/southindian.jpg"
    },
    {
        id: 1,
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


  // Sort the restaurant list based on filters
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
 

  naviagteToRestaruantFoods(categoryname:string)
  {
    this.router.navigate(['app-restaruants',categoryname])

  }
  naviagteToRestaruantmenu(id:number)
  {
    this.router.navigate(['app-restruantpage',id])
  }
}
