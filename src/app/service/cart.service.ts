import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseurl = "https://localhost:7121/api/Cart";
  private menuItemsUrl = "https://localhost:7121/api/MenuItem";
  private menuUrl="https://localhost:7121/api/Menu";

  constructor(private http: HttpClient) {}

  addCartDetails(cartData: any): Observable<any> {
    return this.http.post(`${this.baseurl}`, cartData);
  }

  deleteCartDetails(id:number):Observable<any>
  {
    return this.http.delete(`${this.baseurl}/${id}`);
  }

  getCartDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}`).pipe(
      switchMap((cartItems: any[]) => {
        // Filter to ensure MenuItemID is defined
        const menuItemRequests = cartItems
          .filter(item => item.menuItemID) // Filter out items with undefined MenuItemID
          .map((item) => {
            // Log the menuItemID being fetched
            console.log(`Fetching details for MenuItemID: ${item.menuItemID}`);
            return this.http.get<any>(`${this.menuItemsUrl}/${item.menuItemID}`); // Fetch menu item details
          });

        return forkJoin(menuItemRequests).pipe(
          switchMap((menuItems: any[]) => {
            // Fetch corresponding menu details for each menu item
            const menuRequests = menuItems.map(menuItem => {
              const menuId = menuItem?.menuID; // Extract menuID from menu item
              console.log(`Fetching details for MenuID: ${menuId}`);
              return this.http.get<any>(`${this.menuUrl}/${menuId}`); // Fetch menu details
            });

            return forkJoin(menuRequests).pipe(
              map((menus: any[]) => {
                // Log the menus fetched
                console.log('Fetched Menus:', menus);

                // Merge cart items, menu items, and restaurant IDs
                const mergedData = cartItems.map((cartItem: any, index: number) => {
                  const menuItem = menuItems[index];
                  const menu = menus[index];
                  return {
                    ...cartItem,
                    name: menuItem?.itemName || 'Unknown Item', // Use itemName from API
                    image: menuItem?.imageUrl || '', // Use imageUrl from API
                    restaurantId: menu?.restaurantID || null, // Include restaurantId from menu
                    linePrice: cartItem.price * cartItem.quantity,
                    discount: menuItem?.discounts || 0 // Use discounts from API
                  };
                });

                // Log the merged data
                console.log('Merged Cart and Menu Items Data:', mergedData);

                return mergedData; // Return the merged data
              })
            );
          })
        );
      })
    );
  }

  

}
