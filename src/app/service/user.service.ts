import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private addUserURL = "https://localhost:7121/api/User";
  private updateURL="";

  constructor(private http: HttpClient) {}
  addUserDetails(addUserData: any): Observable<any> {
    return this.http.post(`${this.addUserURL}`, addUserData);
  }

  updateUserDetails(updateUserData:any):Observable<any>
  {
    return this.http.put(`${this.updateURL}/updateUserData.userID`,updateUserData);
  }



}
