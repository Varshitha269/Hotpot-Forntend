import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/datastructure';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'https://localhost:7121/api/MenuItem'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Define the MenuItem interface here
  

  // Get all menu items
  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  // Get a menu item by ID
  getMenuItemById(menuItemId: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${menuItemId}`);
  }

  // Add a new menu item
  createMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }

  getMenuItemsByMenuId(menuId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu/${menuId}`);
  }

  // Update an existing menu item
  updateMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/${menuItem.menuItemID}`, menuItem);
  }

  // Delete a menu item
  deleteMenuItem(menuItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${menuItemId}`);
  }
}
