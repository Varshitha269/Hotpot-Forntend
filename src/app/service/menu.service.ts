import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Define the Menu model
export interface Menu {
  menuID: number;
  restaurantID: number;
  menuName: string;
  description: string;
  createdDate: Date;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Define the base URL for the API
  private apiUrl = `https://localhost:7121/api/Menu`;

  constructor(private http: HttpClient) { }

  // Method to fetch all menus
  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  // Method to fetch a menu by its ID
  getMenuById(menuID: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${menuID}`);
  }

  getMenusByRestaurantId(restaurantID: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/restaurant/${restaurantID}`);
  }

  // Method to create a new menu
  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  // Method to update an existing menu
  updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${menu.menuID}`, menu);
  }

  // Method to delete a menu
  deleteMenu(menuID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${menuID}`);
  }
}
