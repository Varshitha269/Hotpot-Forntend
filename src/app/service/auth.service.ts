import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode'; // Correct import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7121/api/JwtAuth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password }; // Create a JSON object

    return this.http.post(this.apiUrl, body).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(error); // Consider handling this more gracefully
      })
    );
  }

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  //   this.storePayload(token); // Store payload immediately after setting the token
  // }

  // storePayload(token: string): void {
  //   const decodedToken: any = jwtDecode(token); // Use the imported function
  //   localStorage.setItem('userPayload', JSON.stringify(decodedToken)); // Store payload in localStorage
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userPayload'); // Remove payload on logout
  }

  getUserPayload(): any {
    const payload = localStorage.getItem('userPayload');
    return payload ? JSON.parse(payload) : null; // Retrieve payload
  }
}
