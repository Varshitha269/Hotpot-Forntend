import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError  } from 'rxjs';


import { catchError, map, switchMap } from 'rxjs/operators';

//import { CombinedData, MenuItem, Rating, Restaurant } from './models/datastructure';
import { CombinedData, MenuItem, Rating, Restaurant,Menu ,RestaurantwithMenuItems} from '../model/datastructure';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://localhost:7121/api';
  constructor(private http: HttpClient) {}
  

  getCombinedData1(restaurantId: number): Observable<CombinedData> {
    // Step 1: Fetch Restaurant
    const restaurant$ = this.http.get<Restaurant>(`${this.apiUrl}/Restaurant/${restaurantId}`);

    // Step 2: Fetch all Menus for the Restaurant
    const menus$ = this.http.get<Menu[]>(`${this.apiUrl}/Menu/restaurant/${restaurantId}`);

    return forkJoin([restaurant$, menus$]).pipe(
        switchMap(([restaurant, menus]) => {
            // Fetch all menu items for all menus associated with the restaurant
            const menuItems$ = forkJoin(
                menus.map(menu => 
                    this.http.get<MenuItem[]>(`${this.apiUrl}/MenuItem/menu/${menu.menuID}`)
                )
            );

            // Fetch Ratings
            const ratings$ = this.http.get<Rating[]>(`${this.apiUrl}/FeedbackRatings/restaurant/${restaurantId}`);

            // Use forkJoin to combine menuItems and ratings with the other data
            return forkJoin([menuItems$, ratings$]).pipe(
                map(([menuItemsList, ratings]) => {
                    const menuItems = menuItemsList.flat(); // Flatten the array of arrays
                    return { restaurant, menuItems, ratings };
                })
            );
        }),
        catchError(error => {
            // Handle error appropriately
            console.error('Error fetching combined data', error);
            return throwError(error); // Re-throw error for further handling
        })
    );
}


getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/Restaurant`);
  }

  getCombinedDataForRestaurant(restaurant: Restaurant): Observable<CombinedData> {
    const menus$ = this.http.get<Menu[]>(`${this.apiUrl}/Menu/restaurant/${restaurant.restaurantID}`);

    return menus$.pipe(
      switchMap(menus => {
        const menuItems$ = forkJoin(
          menus.map(menu => 
            this.http.get<MenuItem[]>(`${this.apiUrl}/MenuItem/menu/${menu.menuID}`)
          )
        );
        const ratings$ = this.http.get<Rating[]>(`${this.apiUrl}/FeedbackRatings/restaurant/${restaurant.restaurantID}`);

        return forkJoin([menuItems$, ratings$]).pipe(
          map(([menuItemsList, ratings]) => {
            const menuItems = menuItemsList.flat(); // Flatten menu items array

            return { 
              restaurant, 
              menuItems, 
              ratings 
            };
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching data for restaurant:', error);
        return throwError(error);
      })
    );
  }


  getRestaurantsWithMenuItemName(menuItemName: string): Observable<RestaurantwithMenuItems[]> {
    const apiUrl = `https://localhost:7121/api/RestaurantMenuItem/${menuItemName}`;
  
    return this.http.get<RestaurantwithMenuItems[]>(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching restaurants with menu item name:', error);
        return throwError(() => new Error('Failed to fetch restaurants, please try again later.'));
      })
    );
  }
  


  getRestaurantIdByMenuId(menuId: number): Observable<number> {
    const url = `${this.apiUrl}/Menu/restaurantid/${menuId}`;

    return this.http.get<number>(`${url}`);
  }

  }





  