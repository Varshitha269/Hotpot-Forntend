import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuitemsService {
  private getmenuitemsURL='https://localhost:7121/api/MenuItem/distinct-menu-items';

  constructor(private http:HttpClient) { }
  fetchMenuItems():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.getmenuitemsURL}`)

  }
}
