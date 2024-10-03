import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../service/restaurant.service';
import { FeedbackService } from '../service/feedback.service';
import { Rating } from '../model/datastructure'; // Ensure the correct path

@Component({
  selector: 'app-rratings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rratings.component.html',
  styleUrls: ['./rratings.component.css']
})
export class RratingsComponent implements OnInit {
  ratings: Rating[] = [];
  restid: number = 0; // Corrected from Number to number
  aggregateRating: number = 0;

  constructor(
    private restaurantService: RestaurantService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurantByName().subscribe({
      next: (restaurantId) => {
        this.restid =Number(restaurantId); // Store the restaurant ID
        console.log(`Restaurant ID: ${this.restid}`);

        // Fetch ratings for the restaurant
        this.fetchRatings(this.restid);
      },
      error: (err) => {
        console.error('Error fetching restaurant ID:', err);
      }
    });
  }

  // Fetch ratings for the restaurant
  fetchRatings(restaurantId: number): void {
    this.feedbackService.getRatingsByRestaurantId(restaurantId).subscribe({
      next: (ratings) => {
        this.ratings = ratings; // Assign the fetched ratings to the local array
        // Calculate the aggregate rating after fetching the ratings
        this.aggregateRating = this.calculateAggregateRating();
      },
      error: (err) => {
        console.error('Error fetching ratings:', err);
      }
    });
  }

  // Calculate the average (aggregate) rating for all the ratings
  calculateAggregateRating(): number {
    if (this.ratings.length === 0) return 0;
    const totalStars = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return parseFloat((totalStars / this.ratings.length).toFixed(1)); // Round to 1 decimal place
  }
}
