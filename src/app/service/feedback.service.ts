import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../model/datastructure';
import { Observable } from 'rxjs';
interface FeedbackRating {
  feedbackRatingID: number;
  userID: number;
  restaurantID: number;
  message: string;
  rating: number;
  createdDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'https://localhost:7121/api/FeedbackRatings/restaurant';
  private Url = 'https://localhost:7121/api/FeedbackRatings'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Method to get feedback rating by ID
  getRatingsByRestaurantId(feedbackRatingID: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/${feedbackRatingID}`);
  }

  createFeedbackRating(feedbackRating: FeedbackRating): Observable<FeedbackRating> {

    return this.http.post<FeedbackRating>(this.Url, feedbackRating);
  }
}
