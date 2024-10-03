import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7121/api/JwtAuth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password }; // Create a JSON object

    return this.http.post(this.apiUrl, body).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUserPayload(response.token); // Save decoded token payload
        }
      }),
      catchError((error: any) => {
        console.error(error);
        return of(error); // Consider handling this more gracefully
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.setUserPayload(token);
  }

  setUserPayload(token: string): void {
    const decodedToken = this.decodeToken(); // Decode and get the payload
    if (decodedToken) {
      localStorage.setItem('userPayload', JSON.stringify(decodedToken)); // Store the payload in local storage
    }
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decode the token and return its payload
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  removeToken(): void {
    localStorage.removeItem('token');       // Remove the token
    localStorage.removeItem('userPayload'); // Remove payload on logout
  }

  getToken(): string | null  {
    return localStorage.getItem('token');
  }
 
  getTokenExpiry(): Date | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      // Convert the exp value from Unix timestamp to a Date object
      const expiryDate = new Date(decodedToken.exp * 1000); // Multiply by 1000 to convert seconds to milliseconds
      return expiryDate;
    }
    return null;
  }
}
