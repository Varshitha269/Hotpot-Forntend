import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError  } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';

//import { CombinedData, MenuItem, Rating, Restaurant } from './models/datastructure';
import { CombinedData, MenuItem, Rating, Restaurant,Menu } from '../model/datastructure';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://localhost:7121/api';
  constructor(private http: HttpClient) {}
  // getCombinedData(restaurantId: number): Observable<CombinedData> {
  //   const restaurant$ = this.http.get<Restaurant>(`${this.apiUrl}/Restaurant/${restaurantId}`);
  //   const menuItems$ = this.http.get<MenuItem[]>(`${this.apiUrl}/Menu/${restaurantId}`);
  //   const ratings$ = this.http.get<Rating[]>(`${this.apiUrl}/FeedbackRatings?restaurantId=${restaurantId}`);
  //   return new Observable<CombinedData>(subscriber => {
  //     forkJoin([restaurant$, menuItems$, ratings$]).subscribe(
  //       ([restaurant, menuItems, ratings]) => {
  //         subscriber.next({ restaurant, menuItems, ratings });
  //         subscriber.complete();
  //       },
  //       (error) => {
  //         subscriber.error(error);
  //       }
  //     );
  //   });
  // }

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

  
  }





  